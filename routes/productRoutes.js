const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/new', productController.renderCreateForm);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/:id/edit', productController.renderEditForm);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;