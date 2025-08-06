const express = require('express');
const servicosController = require('../controllers/servicosController');
const router = express.Router();

router.get('/', servicosController.getAllServicos);
router.get('/new', servicosController.renderCreateForm);
router.post('/', servicosController.createServicos);
router.get('/:id', servicosController.getServicosById);
router.get('/:id/edit', servicosController.renderEditForm);
router.put('/:id', servicosController.updateServicos);
router.delete('/:id', servicosController.deleteServicos);

module.exports = router;