const express = require('express');
const vendaController = require('../controllers/vendaController');
const router = express.Router();

router.get('/', vendaController.getAllvenda);
router.get('/new', vendaController.renderCreateForm);
router.post('/', vendaController.createvenda);
router.get('/:id', vendaController.getvendaById);
router.get('/:id/edit', vendaController.renderEditForm);
router.put('/:id', vendaController.updatevenda);
router.delete('/:id', vendaController.deletevenda);

module.exports = router;