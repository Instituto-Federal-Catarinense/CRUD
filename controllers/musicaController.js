const musica = require('../models/musicaModel');

const musicaController = {
    createMusica: (req, res) => {
        const newMusica = {
            nome: req.body.nome,
            genero1: req.body.genero1,
            genero2: req.body.genero2,
            genero3: req.body.genero3
        };

        musica.create(newMusica, (err, musicaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/musicas');
        });
    },

    getMusicaById: (req, res) => {
        const musicaId = req.params.id;

        musica.findById(musicaId, (err, musica) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!musica) {
                return res.status(404).json({ message: 'Musica not found' });
            }
            res.render('musicas/show', { musica });
        });
    },

    getAllMusicas: (req, res) => {
        musica.getAll((err, musicas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('musicas/index', { musicas });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('musicas/create');
    },

    renderEditForm: (req, res) => {
        const musicaId = req.params.id;

        musica.findById(musicaId, (err, musica) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!musica) {
                return res.status(404).json({ message: 'Musica not found' });
            }
            res.render('musicas/edit', { musica });
        });
    },

    updateMusica: (req, res) => {
        const musicaId = req.params.id;
        const updatedMusica = {
            nome: req.body.nome,
            genero1: req.body.genero1,
            genero2: req.body.genero2,
            genero3: req.body.genero3
        };

        musica.update(musicaId, updatedMusica, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/musicas');
        });
    },

    deleteMusica: (req, res) => {
        const musicaId = req.params.id;

        musica.delete(musicaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/musicas');
        });
    }
};

module.exports = musicaController;
