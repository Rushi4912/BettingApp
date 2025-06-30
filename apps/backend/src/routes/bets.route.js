import express from 'express';
const router = express.Router();

import { betController } from '../controllers/bets.js';
import { authMiddleware } from '../middlewares/auth.js';
import { validatePlaceBet } from '../../validators/bets.js';

// POST /bets (Create a new bet)
router.post('/', authMiddleware, validatePlaceBet, betController.createBet);

// GET /bets (Get bet history)
router.get('/', authMiddleware, betController.getBetHistory);

// GET /bets/:id (Get specific bet details)
router.get('/:id', authMiddleware, betController.getBetDetails);

export default router;