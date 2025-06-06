const express = require('express');
const router = express.Router();
const cabeloController = require('../controllers/cabeloController');

router.get('/', cabeloController.getAllCabelos);
router.get('/search', cabeloController.searchCabelos);
router.get('/new', cabeloController.renderCreateForm);
router.post('/', cabeloController.createCabelo);
router.get('/:id', cabeloController.getCabeloById);
router.get('/:id/edit', cabeloController.renderEditForm);
router.put('/:id', cabeloController.updateCabelo);
router.delete('/:id', cabeloController.deleteCabelo);

module.exports = router;
