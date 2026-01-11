const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios); // serve para listar todos os usuários
router.get('/search', usuarioController.searchUsuarios); //serve para buscar usuários por nome ou email
router.get('/new', usuarioController.renderCreateForm); // serve para renderizar o formulário de criação de usuário
router.post('/', usuarioController.createUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;