const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria');

router.get('/', categoriaController.listar);
router.post('/', categoriaController.criar);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.deletar);

module.exports = router;
