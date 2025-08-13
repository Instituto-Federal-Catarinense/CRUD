const express = require('express');
const marcaController = require('../controllers/marcaController');
const router = express.Router();

router.get('/', marcaController.getAllMarcas);
router.get('/new', marcaController.renderCreateForm);
router.post('/', marcaController.createMarca);
router.get('/:id', marcaController.getMarcaById);
router.get('/:id/edit', marcaController.renderEditForm);
router.put('/:id', marcaController.updateMarca);
router.delete('/:id', marcaController.deleteMarca);

module.exports = router;