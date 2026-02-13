const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.get('/', pagamentoController.getAllPagamentos);
router.get('/new', pagamentoController.renderCreateForm);
router.post('/', pagamentoController.createPagamento);
router.get('/:id', pagamentoController.getPagamentoById);
router.get('/:id/edit', pagamentoController.renderEditForm);
router.put('/:id', pagamentoController.updatePagamento);
router.delete('/:id', pagamentoController.deletePagamento);

module.exports = router;