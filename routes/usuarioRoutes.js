const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsers);
router.get('/search', usuarioController.searchUsers); // Adicione esta rota
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createUser);
router.get('/:id', usuarioController.getUserById);
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUser);
router.delete('/:id', usuarioController.deleteUser);

module.exports = router;