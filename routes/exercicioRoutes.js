const express = require('express');
const exercicioController = require('../controllers/exercicioController');
const router = express.Router();

router.get('/', exercicioController.getAllExercicios);
router.get('/new', exercicioController.renderCreateForm);
router.post('/', exercicioController.createExercicio);
router.get('/:id', exercicioController.getExercicioById);
router.get('/:id/edit', exercicioController.renderEditForm);
router.put('/:id', exercicioController.updateExercicio);
router.delete('/:id', exercicioController.deleteExercicio);

module.exports = router;
