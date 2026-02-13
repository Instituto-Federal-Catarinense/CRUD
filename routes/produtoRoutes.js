const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/new', produtoController.form); // Corrigido
router.post('/', produtoController.create); // Corrigido
router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', produtoController.renderEditForm);
router.put('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
