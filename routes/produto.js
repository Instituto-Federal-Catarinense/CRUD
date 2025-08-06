const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto');

router.get('/', produtoController.listar);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;
