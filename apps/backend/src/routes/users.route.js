import express from 'express';
const router = express.Router();

import { userController } from '../controllers/users.js';
import { authMiddleware } from '../middlewares/auth.js';


// GET /users/me (Get current user profile)
router.get('/me', authMiddleware, userController.getProfile);

// PUT /users/me (Update current user profile)
router.put('/me', authMiddleware, userController.updateProfile);

// GET /users/me/history (Get user game history)
// router.get('/me/history', authMiddleware, userController.getGameHistory);

// GET /users/me/statistics (Get user statistics)
// router.get('/me/statistics', authMiddleware, userController.getUserStats);

export default router;