const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Cadastro público de usuário (qualquer pessoa pode se cadastrar)
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);

// Rotas restritas exclusivamente a Administradores
router.get('/', requireAuth, requireAdmin, userController.getAllUsers);
router.get('/search', requireAuth, requireAdmin, userController.searchUsers);
router.get('/:id', requireAuth, requireAdmin, userController.getUserById);
router.get('/:id/edit', requireAuth, requireAdmin, userController.renderEditForm);
router.put('/:id', requireAuth, requireAdmin, userController.updateUser);
router.delete('/:id', requireAuth, requireAdmin, userController.deleteUser);

module.exports = router;