    const express = require('express');
    const musicaController = require('../controllers/musicaController');
    const router = express.Router();

    router.get('/', musicaController.getAllMusicas);
    router.get('/new', musicaController.renderCreateForm);
    router.post('/', musicaController.createMusica);
    router.get('/:id', musicaController.getMusicaById);
    router.get('/:id/edit', musicaController.renderEditForm);
    router.put('/:id', musicaController.updateMusica);
    router.delete('/:id', musicaController.deleteMusica);

    module.exports = router;
