const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Exibe a tela de login.
router.get('/login', authController.renderLoginForm);

// Recebe os dados de login.
router.post('/login', authController.login);

// Realiza o logout da sessão.
router.get('/logout', authController.logout);

module.exports = router;
