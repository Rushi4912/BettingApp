import express from 'express';
const app = express();
const router = express.Router();

// Import route handlers
import authRoutes from './auth.route.js';
import userRoutes from './users.route.js';
// import gameRoutes from './games.route';
// import betRoutes from './bets.route.js';
// import transactionRoutes from './transactions.route.js';
import adminRoutes from './admin.route.js';

app.use(express.json());
// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/games', gameRoutes);
// router.use('/bets', betRoutes);
// router.use('/transactions', transactionRoutes);
router.use('/admin', adminRoutes);

export default router;