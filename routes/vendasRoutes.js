const express = require('express');
const vendaController = require('../controllers/vendaController')
const router = express.Router();

router.get('/',vendaController.getAllVendas);
//router.get('/new',vendaController.renderCreateForm);
//router.post('/',vendaController.createCategoria);
r//outer.get('/:id',vendaController.getCategoriaById);
//router.get('/:id/edit',vendaController.renderEditForm);
//router.put('/:id',vendaController.updateCategoria);
//router.delete('/:id',vendaController.deleteCategoria);

module.exports = router;