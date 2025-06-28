import express from 'express';
const router = express.Router();

// Import route handlers
import authRoutes from './auth.route';
import userRoutes from './users.route';
// import gameRoutes from './games.route';
import betRoutes from './bets.route';
import transactionRoutes from './transactions.route';
import adminRoutes from './admin.route';

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/games', gameRoutes);
router.use('/bets', betRoutes);
router.use('/transactions', transactionRoutes);
router.use('/admin', adminRoutes);

export default router;