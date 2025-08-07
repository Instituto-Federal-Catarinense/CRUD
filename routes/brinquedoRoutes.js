const express = require('express');
const router = express.Router();
const brinquedoController = require('../controllers/brinquedoController');

router.get('/', brinquedoController.list);
router.get('/create', brinquedoController.createForm);
router.post('/create', brinquedoController.create);
router.get('/:id/edit', brinquedoController.editForm);
router.post('/:id/edit', brinquedoController.update);
router.post('/:id/delete', brinquedoController.delete);

module.exports = router;