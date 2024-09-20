const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

// Rota para listar todas as vendas
router.get('/', vendaController.getAllVendas);

// Rota para mostrar o formulário de criação de uma nova venda
router.get('/new', vendaController.renderCreateForm);

// Rota para criar uma nova venda
router.post('/', vendaController.createVenda);

// Rota para mostrar detalhes de uma venda específica
router.get('/:id', vendaController.getVendaById);

// Rota para mostrar o formulário de edição de uma venda específica
router.get('/:id/edit', vendaController.renderEditForm);

// Rota para atualizar uma venda específica
router.put('/:id', vendaController.updateVenda);

// Rota para deletar uma venda específica
router.delete('/:id', vendaController.deleteVenda);

module.exports = router;
