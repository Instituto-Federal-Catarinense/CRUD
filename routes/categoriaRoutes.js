const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { ensureAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/new', ensureAdmin, categoriaController.renderCreateForm);
router.post('/', ensureAdmin, categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', ensureAdmin, categoriaController.renderEditForm);
router.put('/:id', ensureAdmin, categoriaController.updateCategoria);
router.delete('/:id', ensureAdmin, categoriaController.deleteCategoria);

module.exports = router;