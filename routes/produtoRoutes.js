const express = require('express');
const produtoController = require(
    '../controllers/produtoController'
);

const router = express.Router();

router.get('/', produtoController.listarProdutos);
router.get('/search', produtoController.pesquisarProdutos);

router.get(
    '/new',
    produtoController.exibirFormularioCadastro
);

router.post('/', produtoController.cadastrarProduto);

router.get(
    '/:id/edit',
    produtoController.exibirFormularioEdicao
);

router.get(
    '/:id',
    produtoController.buscarProdutoPorId
);

router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.excluirProduto);

module.exports = router;