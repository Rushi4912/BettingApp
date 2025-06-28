import { body } from 'express-validator';

const validatePlaceBet = [
  body('gameId').isString().notEmpty(),
  body('amount').isFloat({ min: 0.01 }),
  body('parameters').optional().isObject(),
];

export default { validatePlaceBet };
