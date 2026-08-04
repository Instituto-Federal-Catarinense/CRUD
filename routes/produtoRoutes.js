const express = require('express');
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rotas públicas (leitura de produtos)
router.get('/', produtoController.getAllProdutos);

// Rotas protegidas por autenticação (criação, edição e exclusão)
router.get('/new', authMiddleware, produtoController.renderCreateForm);
router.post('/', authMiddleware, produtoController.createProduto);

router.get('/:id', produtoController.getProdutoById);

router.get('/:id/edit', authMiddleware, produtoController.renderEditForm);
router.put('/:id', authMiddleware, produtoController.updateProduto);
router.delete('/:id', authMiddleware, produtoController.deleteProduto);

module.exports = router;