const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm);
router.post('/', categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;