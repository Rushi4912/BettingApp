import prisma from '../../../../packages/db/prisma/index.js';

export const transactionController = {
  async deposit(req, res) {
    try {
      const { amount, method, currency } = req.body;

      const userId = req.user.userId;

      // Validate amount
      if (amount <= 0) {
        return res.status(400).json({
          error: {
            code: 'INVALID_AMOUNT',
            message: 'Deposit amount must be positive',
          },
        });
      }

      // Create transaction
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          type: 'DEPOSIT',
          amount,
          method,
          currency,
          status: 'COMPLETED',
        },
      });

      // Update user balance
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
        select: {
          balance: true,
        },
      });

      res.status(201).json({
        transactionId: transaction.id,
        amount: transaction.amount,
        newBalance: user.balance,
        status: transaction.status,
        timestamp: transaction.createdAt,
      });
    } catch (error) {
      console.error('Deposit error:', error);
      res.status(500).json({
        error: {
          code: 'DEPOSIT_FAILED',
          message: 'Failed to process deposit',
        },
      });
    }
  },

  async withdraw(req, res) {
    try {
      const { amount, method } = req.body;

      const userId = req.user.userId;

      // Validate amount
      if (amount <= 0) {
        return res.status(400).json({
          error: {
            code: 'INVALID_AMOUNT',
            message: 'Withdrawal amount must be positive',
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
            message: 'Not enough balance for this withdrawal',
            requested: amount,
            available: user.balance,
          },
        });
      }

      // Create transaction
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          type: 'WITHDRAWAL',
          amount,
          method,
          status: 'PENDING', // Would typically require admin approval
        },
      });

      // For Demo
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'COMPLETED' },
      });

      // Update user balance
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            decrement: amount,
          },
        },
        select: {
          balance: true,
        },
      });

      res.status(201).json({
        transactionId: transaction.id,
        amount: transaction.amount,
        newBalance: updatedUser.balance,
        status: 'COMPLETED',
        timestamp: transaction.createdAt,
      });
    } catch (error) {
      console.error('Withdrawal error:', error);
      res.status(500).json({
        error: {
          code: 'WITHDRAWAL_FAILED',
          message: 'Failed to process withdrawal',
        },
      });
    }
  },
};
