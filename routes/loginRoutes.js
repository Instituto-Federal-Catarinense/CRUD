var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const authMiddleware = require('../middlewares/auth');

// Rotas de Login
router.get('/login', loginController.renderLoginForm);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

// Rota simples para inspecionar a autenticação atual
router.get('/me', authMiddleware, (req, res) => {
	res.json({
		authenticated: true,
		user: req.user || req.session.user,
		sessionUser: req.session ? req.session.user : null
	});
});

// Rotas de Registro
router.get('/register', registerController.renderRegisterForm);
router.post('/register', registerController.register);

module.exports = router;
