const express = require('express');

const AuthController =
    require('../controllers/authController');

const router = express.Router();

router.get(
    '/login',
    AuthController.mostrarLogin
);

router.post(
    '/login',
    AuthController.entrar
);

router.post(
    '/logout',
    AuthController.sair
);

module.exports = router;