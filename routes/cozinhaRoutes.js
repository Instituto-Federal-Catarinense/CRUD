const express = require('express');
const cozinhaController = require(
    '../controllers/cozinhaController'
);

const router = express.Router();

router.get('/', cozinhaController.exibirPainel);

module.exports = router;