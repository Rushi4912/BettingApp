import prisma from '../../../../packages/db/prisma/index.js';

export const userController = {
  async getProfile(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.userId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          phone: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: 'User not found',
          },
        });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: {
          code: 'PROFILE_FETCH_FAILED',
          message: 'Failed to get user profile',
        },
      });
    }
  },

  async updateProfile(req, res) {
    try {
      const { username, email, phone } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: req.user.userId },
        data: {
          username,
          email,
          phone,
        },
        select: {
          id: true,
          username: true,
          email: true,
          phone: true,
        },
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({
        error: {
          code: 'PROFILE_UPDATE_FAILED',
          message: 'Failed to update user profile',
        },
      });
    }
  },

  // async getGameHistory(req, res) {
  //   try {
  //     const { page = 1, limit = 10, gameId } = req.query;

  //     const skip = (page - 1) * limit;

  //     const bets = await prisma.bet.findMany({
  //       where: {
  //         userId: req.user.userId,
  //         gameId: gameId ? gameId : undefined,
  //       },
  //       skip,
  //       take: parseInt(limit),
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //       include: {
  //         game: {
  //           name: true,
  //           type: true,
  //         },
  //       },
  //     });

  //     const total = await prisma.bet.count({
  //       where: {
  //         userId: req.user.userId,
  //         gameId: gameId ? gameId : undefined,
  //       },
  //     });

  //     res.json({
  //       bets,
  //       total,
  //       page: parseInt(page),
  //       pageSize: parseInt(limit),
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       error: {
  //         code: 'HISTORY_FETCH_FAILED',
  //         message: 'Failed to get game history',
  //       },
  //     });
  //   }
  // },

  // async getUserStats(req, res) {
  //   try {
  //     const userId = req.user.userId;

  //     const [totalWagered, totalWins, betCount, winCount] = await Promise.all([
  //       prisma.bet.aggregate({
  //         where: { userId },
  //         _sum: { amount: true },
  //       }),
  //       prisma.bet.aggregate({
  //         where: { userId, result: 'WIN' },
  //         _sum: { winAmount: true },
  //       }),
  //       prisma.bet.count({ where: { userId } }),
  //       prisma.bet.count({ where: { userId, result: 'WIN' } }),
  //     ]);

  //     res.json({
  //       totalWagered: totalWagered._sum.amount || 0,
  //       totalWins: totalWins._sum.winAmount || 0,
  //       betCount,
  //       winCount,
  //       winRate: betCount > 0 ? (winCount / betCount) * 100 : 0,
  //     });
  //   } catch (error) {
  //     console.error('Get user stats error:', error);
  //     res.status(500).json({
  //       error: {
  //         code: 'STATS_FETCH_FAILED',
  //         message: 'Failed to fetch user statistics',
  //       },
  //     });
  //   }
  // },
};
