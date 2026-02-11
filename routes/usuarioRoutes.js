const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', UsuarioController.getAllUsuarios);        ////////////////////////
router.get('/search', UsuarioController.searchUsuarios); // Adicione esta rota //
router.get('/new', UsuarioController.renderCreateForm); ////////////////////////
router.post('/', UsuarioController.createUsuario);
router.get('/:id', UsuarioController.getUsuarioById);
router.get('/:id/edit', UsuarioController.renderEditForm);
router.put('/:id', UsuarioController.updateUsuario);
router.delete('/:id', UsuarioController.deleteUsuario);

module.exports = router;