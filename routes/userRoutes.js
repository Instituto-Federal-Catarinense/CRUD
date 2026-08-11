const express = require('express');
const userController = require('../controllers/userController');
const { authorize } = require('../middleware/auth');
const router = express.Router();

// Apenas administradores podem gerenciar usuários.
router.use(authorize(['admin']));
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/:id/edit', userController.renderEditForm);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;