const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/pedidos', pedidoController.getAllPedidos);
router.get('/pedidos/new', pedidoController.renderCreateForm);
router.post('/pedidos', pedidoController.createPedido);
router.get('/pedidos/:id', pedidoController.getPedidoById);
router.get('/pedidos/:id/edit', pedidoController.renderEditForm);
router.post('/pedidos/:id', pedidoController.updatePedido);
router.post('/pedidos/:id/delete', pedidoController.deletePedido);

module.exports = router;
