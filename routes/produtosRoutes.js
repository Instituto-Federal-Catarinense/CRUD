const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

router.get('/', produtosController.getAllProdutos);
router.get('/new', produtosController.renderCreateForm);
router.post('/', produtosController.createProduto);
router.get('/:id', produtosController.getProdutoById);
router.get('/:id/edit', produtosController.renderEditForm);
router.put('/:id', produtosController.updateProduto);
router.delete('/:id', produtosController.deleteProduto);

module.exports = router;
