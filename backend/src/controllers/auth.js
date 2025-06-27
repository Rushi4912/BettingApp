import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../prisma';

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 12;

export const authController = {
  async register(req, res) {
    try {
      const { username, email, password, phone, balance = 0 } = req.body;

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
          balance: 0,
        },
        select: {
          id: true,
          username: true,
          email: true,
          balance: true,
        },
      });

      // Generate JWT
      const token = sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({
        user,
        token,
        expiresIn: 3600,
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
          error :{
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password"
          }
        })
      }

      // 
    } catch (error) {
      
    }
  }
};
