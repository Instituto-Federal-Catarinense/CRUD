const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.get('/fornecedores', fornecedorController.getAllFornecedores);
router.get('/fornecedores/new', fornecedorController.renderCreateForm);
router.post('/fornecedores', fornecedorController.createFornecedor);
router.get('/fornecedores/:id', fornecedorController.getFornecedorById);
router.get('/fornecedores/:id/edit', fornecedorController.renderEditForm);
router.post('/fornecedores/:id', fornecedorController.updateFornecedor);
router.post('/fornecedores/:id/delete', fornecedorController.deleteFornecedor);

module.exports = router;
