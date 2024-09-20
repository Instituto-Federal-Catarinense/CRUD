const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

router.get('/', vendaController.getAllVendas);
router.get('/new', vendaController.renderCreateForm);
router.post('/', vendaController.createVenda);
router.get('/:id', vendaController.getVendaById);
router.get('/:id/edit', vendaController.renderEditForm);
router.put('/:id', vendaController.updateVenda);
router.delete('/:id', vendaController.deleteVenda);

module.exports = router;