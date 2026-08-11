// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');

// Rotas públicas (acesso sem login)
router.get('/login', isNotAuthenticated, AuthController.showLogin);
router.post('/login', isNotAuthenticated, AuthController.login);
router.get('/register', isNotAuthenticated, AuthController.showRegister);
router.post('/register', isNotAuthenticated, AuthController.register);

// Rotas protegidas (requerem login)
router.get('/dashboard', isAuthenticated, AuthController.dashboard);
router.get('/logout', isAuthenticated, AuthController.logout);

module.exports = router;