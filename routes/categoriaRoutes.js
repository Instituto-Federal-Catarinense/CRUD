const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/new', authenticateJWT, categoriaController.renderCreateForm);
router.post('/', authenticateJWT, categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', authenticateJWT, categoriaController.renderEditForm);
router.put('/:id', authenticateJWT, categoriaController.updateCategoria);
router.delete('/:id', authenticateJWT, categoriaController.deleteCategoria);

module.exports = router;