const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm); // <-- Adicione esta linha
router.post('/create', categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.post('/:id/edit', categoriaController.updateCategoria);
router.post('/:id/delete', categoriaController.deleteCategoria);

module.exports = router;