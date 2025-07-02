const Cor = require('../models/corModel'); // Importe o modelo de cor (ajuste se for Sequelize, Mongoose ou outro ORM)

// Controlador de cores
const corController = {

    // Criar uma nova cor
    createCor: (req, res) => {
        const newCor = {
            nome: req.body.nome
        };

        Cor.create(newCor, (err, corId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/cores'); // Redireciona para a lista de cores
        });
    },

    // Obter uma cor pelo ID
    getCorById: (req, res) => {
        const corId = req.params.id;

        Cor.findById(corId, (err, cor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/show', { cor }); // Exibe os detalhes da cor
        });
    },

    // Obter todas as cores
    getAllCores: (req, res) => {
        Cor.getAll((err, cores) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('cores/index', { cores }); // Exibe a lista de cores
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('cores/create'); // Renderiza o formulário para criar uma nova cor
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const corId = req.params.id;

        Cor.findById(corId, (err, cor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/edit', { cor }); // Exibe o formulário de edição da cor
        });
    },

    // Atualizar os dados de uma cor
    updateCor: (req, res) => {
        const corId = req.params.id;
        const updatedCor = {
            nome: req.body.nome
        };

        Cor.update(corId, updatedCor, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/cores'); // Redireciona para a lista de cores após atualizar
        });
    },

    // Deletar uma cor
    deleteCor: (req, res) => {
        const corId = req.params.id;

        Cor.delete(corId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/cores'); // Redireciona para a lista de cores após excluir
        });
    }
};

module.exports = corController;
