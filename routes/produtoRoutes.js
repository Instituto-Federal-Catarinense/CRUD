const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/produtos', produtoController.getAllProdutos);
router.get('/produtos/new', produtoController.renderCreateForm);
router.post('/produtos', produtoController.createProduto);
router.get('/produtos/:id', produtoController.getProdutoById);
router.get('/produtos/:id/edit', produtoController.renderEditForm);
router.post('/produtos/:id', produtoController.updateProduto);
router.post('/produtos/:id/delete', produtoController.deleteProduto);

module.exports = router;
