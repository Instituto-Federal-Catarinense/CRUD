const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { verificarLogin, verificarAdmin } = require('../middleware/auth');


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
// ROTAS PROTEGIDAS (ADMIN)
// =========================

// Listar usuários
router.get('/', verificarLogin, verificarAdmin, userController.getAllUsers);

// Pesquisar usuários
router.get('/search', verificarLogin, verificarAdmin, userController.searchUsers);

// Formulário de cadastro de usuário (Admin)
router.get('/new', verificarLogin, verificarAdmin, userController.renderCreateForm);

// Salvar usuário
router.post('/', verificarLogin, verificarAdmin, userController.createUser);

// Exibir usuário
router.get('/:id', verificarLogin, verificarAdmin, userController.getUserById);

// Formulário de edição
router.get('/:id/edit', verificarLogin, verificarAdmin, userController.renderEditForm);

// Atualizar usuário
router.put('/:id', verificarLogin, verificarAdmin, userController.updateUser);

// Excluir usuário
router.delete('/:id', verificarLogin, verificarAdmin, userController.deleteUser);

// =========================
// ROTAS PROTEGIDAS (LOGADO)
// =========================

// Logout (POST)
router.post('/logout', verificarLogin, userController.logout);

module.exports = router;
