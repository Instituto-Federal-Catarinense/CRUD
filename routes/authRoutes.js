const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/register', authController.renderRegisterForm);
router.post('/register', authController.register);

module.exports = router;
