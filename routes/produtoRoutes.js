const express = require('express');
const produtoController = require('../controllers/produtoController');
const { requireLogin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/new', requireLogin, produtoController.renderCreateForm);
router.post('/', requireLogin, produtoController.createProduto);
router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', requireLogin, produtoController.renderEditForm);
router.put('/:id', requireLogin, produtoController.updateProduto);
router.delete('/:id', requireLogin, produtoController.deleteProduto);

module.exports = router;