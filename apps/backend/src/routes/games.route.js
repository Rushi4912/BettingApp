import express from 'express';
const router = express.Router();

import { gameController } from '../controllers/games.js';
import { authMiddleware } from '../middlewares/auth.js';

// GET /games (Get all games)
router.get('/', authMiddleware, gameController.getAllGames);

// GET /games/:id (Get game details)
router.get('/:id', authMiddleware, gameController.getGameDetails);

// GET /games/:id/play (Get game details)
router.get('/:id/play', authMiddleware, gameController.getGameDetails);

// POST /games/:id/play (Initialize game session)
router.post('/:id/play', authMiddleware, gameController.initializeGame);

// POST /games/:id/play (Submit game action)
router.post('/:id/play', authMiddleware, gameController.handleGameAction);

export default router;
