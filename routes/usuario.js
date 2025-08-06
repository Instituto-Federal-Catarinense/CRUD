const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');

router.get('/', usuarioController.listar);
router.post('/', usuarioController.criar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.deletar);

module.exports = router;
