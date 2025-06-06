const express = require('express');
const timaoController = require('../controllers/timaoController');
const router = express.Router();

router.get('/', timaoController.getAllTimaos);
router.get('/new', timaoController.renderCreateForm);
router.post('/', timaoController.createTimao);
router.get('/:id', timaoController.getTimaoById);
router.get('/:id/edit', timaoController.renderEditForm);
router.put('/:id', timaoController.updateTimao);
router.delete('/:id', timaoController.deleteTimao);

module.exports = router;