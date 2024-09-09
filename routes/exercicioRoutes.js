const express = require('express');
const exercicioController = require('../controllers/exercicioController');
const router = express.Router();

router.get('/', exercicioController.getAllExercicios);
router.get('/new', exercicioController.renderCreateForm);
router.post('/', exercicioController.createExercicio);
router.get('/filter', exercicioController.renderFilterPage);
router.get('/:id', exercicioController.showExercicio);
router.get('/:id/edit', exercicioController.renderEditForm);
router.put('/:id', exercicioController.updateExercicio);
router.delete('/:id', exercicioController.deleteExercicio);

module.exports = router;
