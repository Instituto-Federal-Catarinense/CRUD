const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rotas públicas para autenticação.
router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
