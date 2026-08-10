const express = require('express');
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);
router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById);

// Protected routes (require login)
router.get('/', authenticateJWT, userController.getAllUsers);
router.get('/:id/edit', authenticateJWT, userController.renderEditForm);
router.put('/:id', authenticateJWT, userController.updateUser);
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;