const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Rota para obter todos os produtos
router.get('/', productController.getAllProducts);

// Rota para renderizar o formulário de criação de um novo produto
router.get('/new', productController.renderCreateForm);

// Rota para criar um novo produto
router.post('/', productController.createProduct);

// Rota para obter um produto específico por ID
router.get('/:id', productController.getProductById);

// Rota para renderizar o formulário de edição de um produto existente
router.get('/:id/edit', productController.renderEditForm);

// Rota para atualizar um produto existente
router.put('/:id', productController.updateProduct);

// Rota para deletar um produto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
