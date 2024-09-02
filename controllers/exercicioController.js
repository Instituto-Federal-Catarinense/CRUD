const Musica = require('../models/musicaModel');
const Exercicio = require('../models/exercicioModel');

const exercicioController = {
    createExercicio: (req, res) => {
        const newExercicio = {
            exercicio1: req.body.exercicio1,
            exercicio2: req.body.exercicio2,
            exercicio3: req.body.exercicio3,
            exercicio4: req.body.exercicio4,
            repeticao: req.body.repeticao,
            serie: req.body.serie,
            duracao: req.body.duracao,
            aplicabilidade: req.body.aplicabilidade,
            musica: req.body.musica
        };

        Exercicio.create(newExercicio, (err, exercicioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/exercicios');
        });
    },

    getExercicioById: (req, res) => {
        const exercicioId = req.params.id;

        Exercicio.findById(exercicioId, (err, exercicio) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!exercicio) {
                return res.status(404).json({ message: 'Exercício não encontrado' });
            }

            Musica.getAll((err, musicas) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('exercicios/edit', { exercicio, musicas });
            });
        });
    },

    getAllExercicios: (req, res) => {
        Exercicio.getAll((err, exercicios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('exercicios/index', { exercicios });
        });
    },

    renderCreateForm: (req, res) => {
        Musica.getAll((err, musicas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('exercicios/create', { musicas });
        });
    },

    renderEditForm: (req, res) => {
        const exercicioId = req.params.id;

        Exercicio.findById(exercicioId, (err, exercicio) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!exercicio) {
                return res.status(404).json({ message: 'Exercício não encontrado' });
            }

            Musica.getAll((err, musicas) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('exercicios/edit', { exercicio, musicas });
            });
        });
    },

    updateExercicio: (req, res) => {
        const exercicioId = req.params.id;
        const updatedExercicio = {
            exercicio1: req.body.exercicio1,
            exercicio2: req.body.exercicio2,
            exercicio3: req.body.exercicio3,
            exercicio4: req.body.exercicio4,
            repeticao: req.body.repeticao,
            serie: req.body.serie,
            duracao: req.body.duracao,
            aplicabilidade: req.body.aplicabilidade,
            musica: req.body.musica
        };

        Exercicio.update(exercicioId, updatedExercicio, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/exercicios');
        });
    },

    deleteExercicio: (req, res) => {
        const exercicioId = req.params.id;

        Exercicio.delete(exercicioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/exercicios');
        });
    }
};

module.exports = exercicioController;
