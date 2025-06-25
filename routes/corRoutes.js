const express = require('express');
const corController = require('../controllers/corController');
const router = express.Router();

router.get('/', corController.getAllCores);
router.get('/new', corController.renderCreateForm);
router.post('/', corController.createCor);
router.get('/:id', corController.getCorById);
router.get('/:id/edit', corController.renderEditForm);
router.put('/:id', corController.updateCor);
router.delete('/:id', corController.deleteCor);

module.exports = router;
