const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const router = express.Router();

router.get('/', usuariosController.getAllUsuarioss);
router.get('/search', usuariosController.searchUsuarioss); // Adicione esta rota
router.get('/new', usuariosController.renderCreateForm);
router.post('/', usuariosController.createUsuarios);
router.get('/:id', usuariosController.getUsuariosById);
router.get('/:id/edit', usuariosController.renderEditForm);
router.put('/:id', usuariosController.updateUsuarios);
router.delete('/:id', usuariosController.deleteUsuarios);

module.exports = router;