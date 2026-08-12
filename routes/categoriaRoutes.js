const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm);
router.post('/', isAdmin, categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.put('/:id', isAdmin, categoriaController.updateCategoria);
router.delete('/:id', isAdmin, categoriaController.deleteCategoria);

module.exports = router;