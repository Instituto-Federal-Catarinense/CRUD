const Pagamentos = require('../models/pagamentosModel');

const pagamentosController = {
    createPagamento: (req, res) => {
        const newPagamento = {
            appointment_id: req.body.appointment_id,
            amount: req.body.amount,
            payment_method: req.body.payment_method,
            status: req.body.status,
            transaction_date: req.body.transaction_date,
        };

        Pagamentos.create(newPagamento, (err, pagamentoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pagamentos');
        });
    },

    getPagamentoById: (req, res) => {
        const pagamentoId = req.params.id;

        Pagamentos.findById(pagamentoId, (err, pagamento) => {
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
        Pagamentos.getAll((err, pagamentos) => {
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

        Pagamentos.findById(pagamentoId, (err, pagamento) => {
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
            appointment_id: req.body.appointment_id,
            amount: req.body.amount,
            payment_method: req.body.payment_method,
            status: req.body.status,
            transaction_date: req.body.transaction_date,
        };

        Pagamentos.update(pagamentoId, updatedPagamento, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pagamentos');
        });
    },

    deletePagamento: (req, res) => {
        const pagamentoId = req.params.id;

        Pagamentos.delete(pagamentoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pagamentos');
        });
    },
};

module.exports = pagamentosController;
