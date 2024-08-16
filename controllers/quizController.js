const quiz = require('../models/quizModel');

const quizController = {
    createquiz: (req, res) => {
        const newquiz = {
            quizname: req.body.quizname,
            password: req.body.password,
            role: req.body.role,
        };

        quiz.create(newquiz, (err, quizId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/quizs');
        });
    },

    getquizById: (req, res) => {
        const quizId = req.params.id;

        quiz.findById(quizId, (err, quiz) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!quiz) {
                return res.status(404).json({ message: 'quiz not found' });
            }
            res.render('quizs/show', { quiz });
        });
    },

    getAllquizs: (req, res) => {
        quiz.getAll((err, quizs) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('quizs/index', { quizs });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('quizs/create');
    },

    renderEditForm: (req, res) => {
        const quizId = req.params.id;

        quiz.findById(quizId, (err, quiz) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!quiz) {
                return res.status(404).json({ message: 'quiz not found' });
            }
            res.render('quizs/edit', { quiz });
        });
    },

    updatequiz: (req, res) => {
        const quizId = req.params.id;
        const updatedquiz = {
            quizname: req.body.quizname,
            password: req.body.password,
            role: req.body.role,
        };

        quiz.update(quizId, updatedquiz, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/quizs');
        });
    },

    deletequiz: (req, res) => {
        const quizId = req.params.id;

        quiz.delete(quizId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/quizs');
        });
    },
};

module.exports = quizController;
