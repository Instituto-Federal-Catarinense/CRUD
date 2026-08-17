const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/login', authMiddleware.setCurrentUser, authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
