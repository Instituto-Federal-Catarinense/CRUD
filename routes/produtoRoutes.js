const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.getAllProdutos);
router.get('/new', produtoController.renderCreateForm);
router.post('/', produtoController.createProduto);
router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', produtoController.renderEditForm);
router.put('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;