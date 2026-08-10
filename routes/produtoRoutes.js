const express = require('express');
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protege todas as rotas de produtos
router.use(authMiddleware);

router.get('/', produtoController.getAllProdutos);

router.get('/new', produtoController.renderCreateForm);

router.post('/', produtoController.createProduto);

router.get('/:id', produtoController.getProdutoById);

router.get('/:id/edit', produtoController.renderEditForm);

router.put('/:id', produtoController.updateProduto);

router.delete('/:id', produtoController.deleteProduto);

module.exports = router;