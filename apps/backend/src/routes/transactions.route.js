import express from 'express';
const router = express.Router();

import { transactionController } from '../controllers/transactions.js';
import { authMiddleware } from '../middlewares/auth.js';
// import { validateDeposit, validateWithdrawal } from '../validators/transactions';

// POST /transactions/deposit (Deposit funds)
router.post(
  '/deposit',
  authMiddleware,
  transactionController.deposit
);

// POST /transactions/withdraw (Withdraw funds)
router.post(
  '/withdraw',
  authMiddleware,
  transactionController.withdraw
);

// GET /transactions (Get transaction history)
router.get('/', authMiddleware, transactionController.getTransactionHistory);

// GET /transactions/:id (Get transaction details)
router.get('/:id', authMiddleware, transactionController.getTransactionDetails);

export default router;
