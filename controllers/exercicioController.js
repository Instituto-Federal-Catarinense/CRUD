const Musica = require('../models/musicaModel');
const Exercicio = require('../models/exercicioModel');

const exercicioController = {
    createExercicio: (req, res) => {
        // Atualizado para usar apenas o campo 'exercicio'
        const newExercicio = {
            exercicio: req.body.exercicio,  // Corrigido para 'exercicio'
            repeticao: req.body.repeticao,
            serie: req.body.serie,
            duracao: req.body.duracao,
            aplicabilidade: req.body.aplicabilidade,
            musicas: req.body.musicas  // Corrigido para 'musicas'
        };

        Exercicio.create(newExercicio, (err, exercicioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/exercicios');
        });
    },

    renderFilterPage: (req, res) => {
        const filtroExercicio = req.query.exercicio;  // Obter o filtro da requisição

        // Se um filtro for passado, aplique-o na consulta
        let query = 'SELECT * FROM exercicios';
        const params = [];

        if (filtroExercicio) {
            query += ' WHERE exercicio = ?';
            params.push(filtroExercicio);
        }

        Exercicio.filter(query, params, (err, exercicios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('exercicios/list', { exercicios });
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


    showExercicio: (req, res) => {
        const exercicioId = req.params.id;

        Exercicio.findById(exercicioId, (err, exercicio) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!exercicio) {
                return res.status(404).json({ message: 'Exercício não encontrado' });
            }

            Musica.findById(exercicio.musicas, (err, musica) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                exercicio.musica_nome = musica.nome;
                res.render('exercicios/show', { exercicio });
            });
        });
    },

    updateExercicio: (req, res) => {
        const exercicioId = req.params.id;
        // Atualizado para usar apenas o campo 'exercicio'
        const updatedExercicio = {
            exercicio: req.body.exercicio,  // Corrigido para 'exercicio'
            repeticao: req.body.repeticao,
            serie: req.body.serie,
            duracao: req.body.duracao,
            aplicabilidade: req.body.aplicabilidade,
            musicas: req.body.musicas  // Corrigido para 'musicas'
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
