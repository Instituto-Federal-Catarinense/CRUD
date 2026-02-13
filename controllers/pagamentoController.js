const Pagamento = require('../models/pagamentoModel');

const pagamentoController = {
    createPagamento: (req, res) => {
        const newPagamento = {
            nome: req.body.nome,
            descricao: req.body.descricao
        };

        Pagamento.create(newPagamento, (err, pagamentoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pagamentos');
        });
    },

    getPagamentoById: (req, res) => {
        const pagamentoId = req.params.id;

        Pagamento.findById(pagamentoId, (err, pagamento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!pagamento) {
                return res.status(404).json({ message: 'Pagamento not found' });
            }
            res.render('pagamentos/show', { pagamento });
        });
    },

    getAllPagamentos: (req, res) => {
        Pagamento.getAll((err, pagamentos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('pagamentos/index', { pagamentos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('pagamentos/create');
    },

    renderEditForm: (req, res) => {
        const pagamentoId = req.params.id;

        Pagamento.findById(pagamentoId, (err, pagamento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!pagamento) {
                return res.status(404).json({ message: 'Pagamento not found' });
            }
            res.render('pagamentos/edit', { pagamento });
        });
    },

    updatePagamento: (req, res) => {
        const pagamentoId = req.params.id;
        const updatedPagamento = {
            nome: req.body.nome,
            descricao: req.body.descricao
        };

        Pagamento.update(pagamentoId, updatedPagamento, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pagamentos');
        });
    },

    deletePagamento: (req, res) => {
        const pagamentoId = req.params.id;

        Pagamento.delete(pagamentoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pagamentos');
        });
    }
};

module.exports = pagamentoController;