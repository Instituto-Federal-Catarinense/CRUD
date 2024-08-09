const express = require('express');
const timeController = require('../controllers/timeController');
const router = express.Router();


router.get('/', timeController.getAllHorario);
router.get('/new', timeController.renderCreateForm);
router.post('/', timeController.createHorario);
router.get('/:id', timeController.getHorarioById);
router.get('/:id/edit', timeController.renderEditForm);
router.put('/:id', timeController.updateHorario);
router.delete('/:id', timeController.deleteHorario);


module.exports = router;
