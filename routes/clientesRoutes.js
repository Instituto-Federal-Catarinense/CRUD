const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/new', clienteController.renderCreateForm);
router.post('/clientes', clienteController.createCliente);
router.get('/clientes/:id', clienteController.getClienteById);
router.get('/clientes/:id/edit', clienteController.renderEditForm);
router.post('/clientes/:id', clienteController.updateCliente);
router.post('/clientes/:id/delete', clienteController.deleteCliente);

module.exports = router;
