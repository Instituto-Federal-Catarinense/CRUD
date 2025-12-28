const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios); //tem o mesmo endereço, mas são métodos diferentes
router.post('/', usuarioController.createUsuario); //tem o mesmo endereço, mas são métodos diferentes
router.get('/search', usuarioController.searchUsuarios);
router.get('/new', usuarioController.renderCreateForm);
router.get('/:id', usuarioController.getUsuarioById);
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;

//padrão de nome singularRoutes