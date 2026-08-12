const express = require('express');
const pedidoController = require(
    '../controllers/pedidoController'
);

const router = express.Router();

router.get(
    '/',
    pedidoController.listarPedidos
);

router.get(
    '/new',
    pedidoController.exibirFormularioCadastro
);

router.post(
    '/',
    pedidoController.cadastrarPedido
);

router.put(
    '/:id/status',
    pedidoController.atualizarStatus
);

router.get(
    '/:id',
    pedidoController.visualizarPedido
);

router.delete(
    '/:id',
    pedidoController.excluirPedido
);

module.exports = router;