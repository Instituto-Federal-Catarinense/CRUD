const express = require('express');
const entregaController = require(
    '../controllers/entregaController'
);

const router = express.Router();

router.get('/', entregaController.exibirPainel);

module.exports = router;