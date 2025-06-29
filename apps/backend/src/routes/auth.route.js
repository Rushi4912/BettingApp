import express from 'express';
const router = express.Router();

import { authController } from '../controllers/auth.js';

// POST /auth/login
router.post('/login', authController.login);

// POST /auth/register
router.post('/register', authController.register);

// POST /auth/login
router.post('/login', authController.login);

// POST /auth/refresh
// router.post('/refresh', authController.refreshToken);

// POST /auth/logout
router.post('/logout', authController.logout);
export default router;