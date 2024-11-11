const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get('/', loginController.renderLoginForm); // Renderiza o formulário de login
router.post('/', loginController.handleLogin); // Processa o login
router.get('/logout', loginController.logout); // Rota para logout

module.exports = router;
