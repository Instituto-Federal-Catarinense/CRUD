const express = require('express');
const router = express.Router();
const tanqueController = require('../controllers/tanqueController');

// Listar todos os tanques
router.get('/', tanqueController.getAllTanques);

// Exibir formulário de criação
router.get('/create', tanqueController.renderCreateForm);

// Criar tanque
router.post('/', tanqueController.createTanque);

// Exibir detalhes de um tanque
router.get('/:id', tanqueController.getTanqueById);

// Exibir formulário de edição
router.get('/:id/edit', tanqueController.renderEditForm);

// Atualizar tanque
router.put('/:id', tanqueController.updateTanque);

// Excluir tanque
router.delete('/:id', tanqueController.deleteTanque);

module.exports = router;
