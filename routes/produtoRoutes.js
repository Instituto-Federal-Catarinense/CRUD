const express = require('express');
const produtoController = require('../controllers/produtoController');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/new', produtoController.renderCreateForm);
router.post('/', isAdmin, produtoController.createProduto);
router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', produtoController.renderEditForm);
router.put('/:id', isAdmin, produtoController.updateProduto);
router.delete('/:id', isAdmin, produtoController.deleteProduto);

module.exports = router;