<<<<<<< Updated upstream
const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm);
router.post('/', categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

=======
const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();
const verificarLogin = require("../middleware/auth");

router.get('/', categoriaController.getAllCategorias);
router.get('/new', categoriaController.renderCreateForm);
router.post('/', categoriaController.createCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.get('/:id/edit', categoriaController.renderEditForm);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

router.get("/",verificarLogin,categoriaController.getAllCategorias);

router.get("/new",verificarLogin,categoriaController.renderCreateForm);

router.post("/",verificarLogin,categoriaController.createCategoria);

router.get("/:id",verificarLogin,categoriaController.getCategoriaById);

router.get("/:id/edit",verificarLogin,categoriaController.renderEditForm);

router.put("/:id",verificarLogin,categoriaController.updateCategoria);

router.delete("/:id",verificarLogin,categoriaController.deleteCategoria);
>>>>>>> Stashed changes
module.exports = router;