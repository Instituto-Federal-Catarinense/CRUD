// Arquivo de rotas para verificação de autenticação

const express = require('express');
const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/authMiddleware');

const router = express.Router();
// rotas e suas funções do Controller respectivas 
router.get('/login', ensureGuest, authController.renderLoginForm);
router.post('/login', ensureGuest, authController.login);
router.post('/logout', authController.logout);

module.exports = router;