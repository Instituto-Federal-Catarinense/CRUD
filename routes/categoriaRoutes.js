const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { authorize } = require('../middleware/auth');
const router = express.Router();

// Usuários autenticados podem acessar o cadastro de categorias.
router.use(authorize(['admin', 'user']));
router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm);
router.post('/', categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;