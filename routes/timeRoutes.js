const express = require('express');
const timeController = require('../controllers/timeController');
const router = express.Router();

router.get('/', timeController.getAllTimes);
router.get('/new', timeController.renderCreateForm);
router.post('/', timeController.createTime);
router.get('/:id', timeController.getTimeById);
router.get('/:id/edit', timeController.renderEditForm);
router.put('/:id', timeController.updateTime);
router.delete('/:id', timeController.deleteTime);

module.exports = router;