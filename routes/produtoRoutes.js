const express = require('express');
const produtoController = require('../controllers/produtoController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Listar produtos (disponível para todos)
router.get('/', produtoController.getAllProdutos);

// Exibir formulário de criação (restrito a Administradores) - DEVE vir antes de /:id
router.get('/new', requireAuth, requireAdmin, produtoController.renderCreateForm);

// Processar criação de produto (restrito a Administradores)
router.post('/', requireAuth, requireAdmin, produtoController.createProduto);

// Exibir detalhes do produto (disponível para todos)
router.get('/:id', produtoController.getProdutoById);

// Formulário de edição (restrito a Administradores)
router.get('/:id/edit', requireAuth, requireAdmin, produtoController.renderEditForm);

// Atualizar produto (restrito a Administradores)
router.put('/:id', requireAuth, requireAdmin, produtoController.updateProduto);

// Excluir produto (restrito a Administradores)
router.delete('/:id', requireAuth, requireAdmin, produtoController.deleteProduto);

module.exports = router;