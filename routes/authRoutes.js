const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/register', userController.renderCreateForm);
router.get('/logout', authController.logout);
router.post('/logout', authController.logout);

module.exports = router;
