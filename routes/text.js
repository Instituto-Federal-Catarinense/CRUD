const express = require('express');
const textController = require('../controllers/textController');
const router = express.Router();

// Rotas para Texts
router.get('/', textController.getAllTexts);
router.get('/search', textController.searchTexts);
router.get('/email', textController.searchByEmail); 
router.get('/new', textController.renderCreateForm);
router.post('/', textController.createText);
router.get('/:id', textController.getTextById);
router.get('/:id/edit', textController.renderEditForm);
router.put('/:id', textController.updateText);
router.delete('/:id', textController.deleteText);

module.exports = router;