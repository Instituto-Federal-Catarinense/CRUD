const User = require('../models/userModel'); // Certifique-se de ter um modelo User
const musica = require('../models/musicaModel');

const musicaController = {
    createMusica: (req, res) => {
        const newMusica = {
            nome: req.body.nome,
            genero1: req.body.genero1,
            genero2: req.body.genero2,
            genero3: req.body.genero3,
            userId: req.body.users // Inclua o ID do usuário selecionado
        };

        musica.create(newMusica, (err, musicaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/musicas');
        });
    },

    renderCreateForm: (req, res) => {
        User.getAll((err, users) => { // Obter a lista de usuários
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('musicas/create', { users }); // Passar a lista de usuários para a view
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

    renderEditForm: (req, res) => {
        const musicaId = req.params.id;
        musica.findById(musicaId, (err, musica) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!musica) {
                return res.status(404).json({ message: 'Musica not found' });
            }
            User.getAll((err, users) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('musicas/edit', { musica, users });
            });
        });
    },

    updateMusica: (req, res) => {
        const musicaId = req.params.id;
        const updatedMusica = {
            nome: req.body.nome,
            genero1: req.body.genero1,
            genero2: req.body.genero2,
            genero3: req.body.genero3,
            userId: req.body.users
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
