import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { prisma } from '../../prisma';

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 12;

export const authController = {
  async register(req, res) {
    try {
      const { username, email, password, phone} = req.body;

      // check if user exists
      const extUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      });

      if (extUser) {
        return res.status(400).json({
          error: {
            code: 'USER_EXISTS',
            message: 'User with this email or username already exists',
          },
        });
      }

      // Hash password
      const hashedPassword = await hash(password, SALT_ROUNDS);

      // Create user
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          phone,
        },
        select: {
          id: true,
          username: true,
          email: true,
          phone : true,
        },
      });

      // Generate JWT
      const token = sign({ userId: user.id }, JWT_SECRET);

      res.status(201).json({
        token,
      });
    } catch (error) {
      console.error('Registration error: ', error);
      res.status(500).json({
        error: {
          code: 'REGISTRATION_FAILED',
          message: 'Failed to register user',
        },
      });
    }
  },

  async login(req, res) {
    
    try {
      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        });
      }

      // verify password
      const isValid = await compare(password, user.password);

      if (!isValid) {
        return res.status(400).json({
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        });
      }
    

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          balance: user.balance,
        },
      });
    } catch (error) {
      console.error('Login error: ', error);
      res.status(500).json({
        error: {
          code: 'LOGIN_FAILED',
          message: 'Failed to login',
        },
      });
    }
  },

  // async refreshToken(req, res) {
  //   try {
  //     const { userId } = req.user;

  //     const user = await prisma.user.findUnique({
  //       where: { id: userId },
  //       select: { id: true },
  //     });

  //     if (!user) {
  //       return res.status(401).json({
  //         error: {
  //           code: 'USER_NOT_FOUND',
  //           message: 'Invalid token',
  //         },
  //       });
  //     }

  //     const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  //     res.json({
  //       token,
  //       expiresIn: 3600,
  //     });
  //   } catch (error) {
  //     console.error('Refresh token error: ', error);
  //     res.status(500).json({
  //       error: {
  //         code: 'REFRESH_FAILED',
  //         message: 'Failed to refresh token',
  //       },
  //     });
  //   }
  // },

  async logout(req, res) {
    // res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  },
};
