import express from 'express';
const router = express.Router();
import { adminController } from '../controllers/admin';
import { authMiddleware } from '../middlewares/auth';

// Apply admin middleware to all admin routes
router.use(authMiddleware, adminController.isAdmin);

// GET /admin/users (List all users)
router.get('/users', adminController.listUsers);

// GET /admin/users/:id (Get user details)
// router.get('/users/:id', adminController.getUserDetails);

// POST /admin/users/:id/balance (Adjust user balance)
// router.post('/users/:id/balance', adminController.adjustBalance);

// GET /admin/stats (Get platform statistics)
router.get('/stats', adminController.getPlatformStats);

// POST /admin/games (Create new game)
router.post('/games', adminController.createGame);

// PUT /admin/games/:id (Update game)
router.put('/games/:id', adminController.updateGame);

export default router;
