const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

// Rotas para Fornecedores
router.get('/', fornecedorController.listarFornecedores);
router.get('/novo', fornecedorController.novoFornecedorForm);
router.post('/', fornecedorController.criarFornecedor);
router.get('/editar/:id', fornecedorController.editarFornecedorForm);
router.post('/editar/:id', fornecedorController.atualizarFornecedor);
router.post('/excluir/:id', fornecedorController.excluirFornecedor);

module.exports = router;