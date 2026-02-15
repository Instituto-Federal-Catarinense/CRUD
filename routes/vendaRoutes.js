const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

// Mostrar todas as vendas
router.get('/', vendaController.getAllVendas);

// Formulário para criar nova venda
router.get('/new', vendaController.renderCreateForm);

// Criar nova venda
router.post('/', vendaController.createVenda);

// Ver detalhes de uma venda específica
router.get('/:id', vendaController.getVendaById);

// Formulário para editar venda
router.get('/:id/edit', vendaController.renderEditForm);

// Atualizar venda
router.post('/:id/update', vendaController.updateVenda);

// Excluir venda
router.post('/:id/delete', vendaController.deleteVenda);

module.exports = router;
