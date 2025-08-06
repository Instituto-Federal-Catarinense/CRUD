const express = require('express');
const fornecedorController = require('../controllers/fornecedorController');
const router = express.Router();

router.get('/', fornecedorController.getAllFornecedores);
router.get('/new', fornecedorController.renderCreateForm);
router.post('/', fornecedorController.createFornecedor);
router.get('/:id', fornecedorController.getFornecedorById);
router.get('/:id/edit', fornecedorController.renderEditForm);
router.put('/:id', fornecedorController.updateFornecedor);
router.delete('/:id', fornecedorController.deleteFornecedor);

module.exports = router;