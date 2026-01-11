const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

router.get('/', pedidoController.listarPedidos);
//router.get('/new', pedidoController.renderCreateForm);
router.post('/', pedidoController.criarPedido);
router.get('/:id', pedidoController.buscarPedidoPorId);
//router.get('/:id/edit', pedidoController.renderEditForm);
router.put('/:id', pedidoController.atualizarPedido);
router.delete('/:id', pedidoController.deletarPedido);

module.exports = router;