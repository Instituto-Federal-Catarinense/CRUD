const express = require('express');
const clienteController = require(
    '../controllers/clienteController'
);

const router = express.Router();

router.get('/', clienteController.listarClientes);
router.get('/search', clienteController.pesquisarClientes);
router.get(
    '/new',
    clienteController.exibirFormularioCadastro
);
router.post('/', clienteController.cadastrarCliente);
router.get(
    '/:id/edit',
    clienteController.exibirFormularioEdicao
);
router.get(
    '/:id',
    clienteController.buscarClientePorId
);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;