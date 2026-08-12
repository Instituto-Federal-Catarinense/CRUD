const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { requireLogin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/new', requireLogin, categoriaController.renderCreateForm);
router.post('/', requireLogin, categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', requireLogin, categoriaController.renderEditForm);
router.put('/:id', requireLogin, categoriaController.updateCategoria);
router.delete('/:id', requireLogin, categoriaController.deleteCategoria);

module.exports = router;