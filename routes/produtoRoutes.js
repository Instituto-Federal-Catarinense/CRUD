const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();
const { verificarLogin } = require('../middleware/auth');

router.get('/', verificarLogin, produtoController.getAllProdutos);
router.get('/new', verificarLogin, produtoController.renderCreateForm);
router.post('/', verificarLogin, produtoController.createProduto);
router.get('/:id', verificarLogin, produtoController.getProdutoById);
router.get('/:id/edit', verificarLogin, produtoController.renderEditForm);
router.put('/:id', verificarLogin, produtoController.updateProduto);
router.delete('/:id', verificarLogin, produtoController.deleteProduto);

module.exports = router;
