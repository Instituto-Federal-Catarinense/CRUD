const express = require('express');
const corController = require('../controllers/corController');
const router = express.Router();

router.get('/', corController.getAllCores);              // Listar todas as cores
router.get('/new', corController.renderCreateForm);      // Formulário para criar nova cor
router.post('/', corController.createCor);               // Criar nova cor
router.get('/:id', corController.getCorById);            // Ver uma cor específica
router.get('/:id/edit', corController.renderEditForm);   // Formulário para editar uma cor
router.put('/:id', corController.updateCor);             // Atualizar uma cor
router.delete('/:id', corController.deleteCor);          // Excluir uma cor

module.exports = router;