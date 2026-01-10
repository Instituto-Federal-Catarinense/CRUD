const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsuario);
router.get('/search', usuarioController.searchUsuario); // Adicione esta rota
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;