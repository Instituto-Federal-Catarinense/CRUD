const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm);
router.post('/', categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;