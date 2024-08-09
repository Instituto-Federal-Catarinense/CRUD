const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

// Route to get all products
router.get('/', produtoController.getAllProducts);

// Route to render the form for creating a new product
router.get('/new', produtoController.renderCreateForm);

// Route to handle the creation of a new product
router.post('/', produtoController.createProduct);

// Route to get a specific product by ID
router.get('/:id', produtoController.getProductById);

// Route to render the form for editing a product
router.get('/:id/edit', produtoController.renderEditForm);

// Route to handle the update of a product
router.put('/:id', produtoController.updateProduct);

// Route to handle the deletion of a product
router.delete('/:id', produtoController.deleteProduct);

module.exports = router;
