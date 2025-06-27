import express from 'express';
const router = express.router();
const authController = require('../controllers/auth');
// const { validateLogin, validateRegister } = require('../validators/auth');

// POST /auth/login
router.post('/login', validateLogin, authController.login);

// POST /auth/register
router.post('/register', validateRegister, authController.register);

// POST /auth/refresh
router.post('/refresh', authController.refreshToken);

// POST /auth/logout
router.post('/logout', authController.logout);

module.exports = router;