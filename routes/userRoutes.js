const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const verificarLogin = require('../middleware/auth');


// =========================
// ROTAS PÚBLICAS
// =========================

// Login
router.get('/login', userController.loginForm);
router.post('/login', userController.login);

// Cadastro
router.get('/register', userController.registerForm);
router.post('/register', userController.register);


// =========================
// ROTAS PROTEGIDAS
// =========================

// Logout
router.get('/logout', verificarLogin, userController.logout);

// Listar usuários
router.get('/', verificarLogin, userController.getAllUsers);

// Pesquisar usuários
router.get('/search', verificarLogin, userController.searchUsers);

// Formulário de cadastro de usuário (Admin)
router.get('/new', verificarLogin, userController.renderCreateForm);

// Salvar usuário
router.post('/', verificarLogin, userController.createUser);

// Exibir usuário
router.get('/:id', verificarLogin, userController.getUserById);

// Formulário de edição
router.get('/:id/edit', verificarLogin, userController.renderEditForm);

// Atualizar usuário
router.put('/:id', verificarLogin, userController.updateUser);

// Excluir usuário
router.delete('/:id', verificarLogin, userController.deleteUser);


module.exports = router;