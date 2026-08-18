const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/new', requireAuth, requireAdmin, categoriaController.renderCreateForm);
router.post('/', requireAuth, requireAdmin, categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', requireAuth, requireAdmin, categoriaController.renderEditForm);
router.put('/:id', requireAuth, requireAdmin, categoriaController.updateCategoria);
router.delete('/:id', requireAuth, requireAdmin, categoriaController.deleteCategoria);

module.exports = router;