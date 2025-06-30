import prisma from '../../../../packages/db/prisma/index.js';

export const adminController = {
  async listUsers(req, res) {
    try {
      const { page = 1, limit = 20, search } = req.query;

      const where = {
        OR: search
          ? [
              { username: { contains: search, mode: 'insensitive' } },
              {
                email: { contains: search, mode: 'insensitive' },
              },
            ]
          : undefined,
      };

      const users = await prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: parseInt(limit),
        select: {
          id: true,
          username: true,
          email: true,
          balance: true,
          currency: true,
          status: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await prisma.user.count({ where });

      res.json({
        users,
        total,
        page: parseInt(page),
        pageSize: parseInt(limit),
      });
    } catch (error) {
      console.error('List users error:', error);
      res.status(500).json({
        error: {
          code: 'USER_LIST_FAILED',
          message: 'Failed to fetch user list',
        },
      });
    }
  },

  // async getUserDetails(req, res){
  //     try {
  //         const {id} = req.params;

  //         const user = await prisma.user.findUnique({
  //           where: { id },
  //           select: {
  //             id: true,
  //             username: true,
  //             email: true,
  //             status: true,
  //             createdAt: true,
  //             updatedAt: true,
  //             bets: {
  //               tale: 5,
  //               orderBy: {
  //                 createdAt: 'desc',
  //               },
  //               select: {
  //                 id: true,
  //                 amount: true,
  //                 result: true,
  //                 winAmount: true,
  //                 createdAt: true,
  //               },
  //               game: {
  //                 select: {
  //                   name: true,
  //                 },
  //               },
  //             },
  //             transactions: {
  //               take: 5,
  //               orderBy: {
  //                 createdAt: 'desc',
  //               },
  //               select: {
  //                 id: true,
  //                 type: true,
  //                 amount: true,
  //                 status: true,
  //                 createdAt: true,
  //               },
  //             },
  //           },
  //         });

  //         if (!user) {
  //           return res.status(404).json({
  //             error: {
  //               code: 'USER_NOT_FOUND',
  //               message: 'User not found',
  //             },
  //           });
  //         }

  //         // Get uesr stats
  //         const [totalWagered, totalWins] = await Promise.all([])
  //     } catch (error) {

  //     }
  // }
};
