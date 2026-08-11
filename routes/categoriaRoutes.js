const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, categoriaController.getAllCategorias);
router.get('/new', authMiddleware, categoriaController.renderCreateForm);
router.post('/', authMiddleware, categoriaController.createCategoria);
router.get('/:id', authMiddleware, categoriaController.getCategoriaById);
router.get('/:id/edit', authMiddleware, categoriaController.renderEditForm);
router.put('/:id', authMiddleware, categoriaController.updateCategoria);
router.delete('/:id', authMiddleware, categoriaController.deleteCategoria);

module.exports = router;