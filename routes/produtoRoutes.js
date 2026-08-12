const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.use(authMiddleware);
router.use(adminMiddleware);


// Protege todas as rotas de produtos

router.get('/', produtoController.getAllProdutos);

router.get('/new', produtoController.renderCreateForm);

router.post('/', produtoController.createProduto);

router.get('/:id', produtoController.getProdutoById);

router.get('/:id/edit', produtoController.renderEditForm);

router.put('/:id', produtoController.updateProduto);

router.delete('/:id', produtoController.deleteProduto);

module.exports = router;