const express = require('express');

const categoriaController = require('../controllers/categoriaController');
const verificarLogin = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarLogin, categoriaController.getAllCategorias);

router.get('/new', verificarLogin, categoriaController.renderCreateForm);

router.post('/', verificarLogin, categoriaController.createCategoria);

router.get('/:id', verificarLogin, categoriaController.getCategoriaById);

router.get('/:id/edit', verificarLogin, categoriaController.renderEditForm);

router.put('/:id', verificarLogin, categoriaController.updateCategoria);

router.delete('/:id', verificarLogin, categoriaController.deleteCategoria);

module.exports = router;