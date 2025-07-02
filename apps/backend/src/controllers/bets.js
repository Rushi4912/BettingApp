import prisma from '../../../../packages/db/prisma/index.js';

export const betController = {
  async placeBet(req, res) {
    try {
      const { gameId, amount, parameters } = req.body;

      const userId = req.user.userId;

      // Verify game exits
      const game = await prisma.game.findUnique({
        where: { id: userId },
      });
      
      if (!game) {
        return res.status(404).json({
          error: {
            code: 'GAME_NOT_FOUND',
            message: 'Game not found',
          },
        });
      }

      // Check bet amount is within game limits
      if (amount < game.minBet || amount > game.maxBet) {
        return res.status(400).json({
          error: {
            code: 'INVALID_BET_AMOUNT',
            message: `Bet amount must be between ${game.minBet} and ${game.maxBet}`,
            minBet: game.minBet,
            maxBet: game.maxBet,
          },
        });
      }

      // Check user balance
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user.balance < amount) {
        return res.status(400).json({
          error: {
            code: 'INSUFFICIENT_FUNDS',
            message: 'Not enough balance to place this bet',
            required: amount,
            available: user.balance,
          },
        });
      }

      // Process bet (simplified - actual game logic would go here)
      const winAmount = Math.random() < game.rtp / 100 ? amount * 2 : 0;
      const result = winAmount > 0 ? 'WIN' : 'LOSS';

      // Update user balance
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            decrement: amount,
            increment: winAmount,
          },
        },
        select: {
          balance: true,
        },
      });

      // Create bet record
      const bet = await prisma.bet.create({
        data: {
          userId,
          gameId,
          amount,
          result,
          winAmount,
          parameters,
        },
        include: {
          game: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(201).json({
        betId: bet.id,
        game: bet.game.name,
        amount: bet.amount,
        result: bet.result,
        winAmount: bet.winAmount,
        newBalance: updatedUser.balance,
        timestamp: bet.createdAt,
      });
    } catch (error) {
      console.error('Place bet error:', error);
      res.status(500).json({
        error: {
          code: 'BET_PLACEMENT_FAILED',
          message: 'Failed to place bet',
        },
      });
    }
  },
};
