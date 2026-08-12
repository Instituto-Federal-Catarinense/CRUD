const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

// Rotas públicas (não exigem login)
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

// Rotas protegidas - apenas usuários logados com role 'admin'
router.get('/', isAuthenticated, authorizeRoles('admin'), userController.getAllUsers);
router.get('/search', isAuthenticated, authorizeRoles('admin'), userController.searchUsers);
router.get('/new', isAuthenticated, authorizeRoles('admin'), userController.renderCreateForm);
router.post('/', isAuthenticated, authorizeRoles('admin'), userController.createUser);
router.get('/:id', isAuthenticated, authorizeRoles('admin'), userController.getUserById);
router.get('/:id/edit', isAuthenticated, authorizeRoles('admin'), userController.renderEditForm);
router.put('/:id', isAuthenticated, authorizeRoles('admin'), userController.updateUser);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;    