const express = require('express');
const testeController = require('../controllers/testeController');
const router = express.Router();

router.get('/', testeController.getAllTestes);
router.get('/new', testeController.renderCreateForm);
router.post('/', testeController.createTeste);
router.get('/:id', testeController.getTesteById);
router.get('/:id/edit', testeController.renderEditForm);
router.put('/:id', testeController.updateTeste);
router.delete('/:id', testeController.deleteTeste);

module.exports = router;
