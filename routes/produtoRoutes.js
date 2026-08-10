const express = require('express');
const produtoController = require('../controllers/produtoController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/new', authenticateJWT, produtoController.renderCreateForm);
router.post('/', authenticateJWT, produtoController.createProduto);
router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', authenticateJWT, produtoController.renderEditForm);
router.put('/:id', authenticateJWT, produtoController.updateProduto);
router.delete('/:id', authenticateJWT, produtoController.deleteProduto);

module.exports = router;