const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/search', authMiddleware, userController.searchUsers);
router.get('/new', authMiddleware, userController.renderCreateForm);
router.post('/', authMiddleware, userController.createUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/:id/edit', authMiddleware, userController.renderEditForm);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;