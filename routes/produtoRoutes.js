const express = require('express');
const produtoController = require('../controllers/produtoController');
const { ensureAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/new', ensureAdmin, produtoController.renderCreateForm);
router.post('/', ensureAdmin, produtoController.createProduto);
router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', ensureAdmin, produtoController.renderEditForm);
router.put('/:id', ensureAdmin, produtoController.updateProduto);
router.delete('/:id', ensureAdmin, produtoController.deleteProduto);

module.exports = router;