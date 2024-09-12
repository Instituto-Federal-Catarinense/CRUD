const Venda = require('../models/vendaModel');
const Produto = require('../models/produtoModel'); // Para obter o preço do produto

const vendaController = {
    createVenda: (req, res) => {
        const newVenda = {
            usuario_id: req.body.usuario_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade
        };

        Produto.findById(newVenda.produto_id, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            newVenda.preco = produto.preco;

            Venda.create(newVenda, (err, vendaId) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.redirect('/vendas');
            });
        });
    },

    getVendaById: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/show', { venda });
        });
    },

    getAllVendas: (req, res) => {
        Venda.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/index', { vendas });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/edit', { venda });
        });
    },

    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const updatedVenda = {
            usuario_id: req.body.usuario_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade
        };

        Produto.findById(updatedVenda.produto_id, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            updatedVenda.preco = produto.preco;

            Venda.update(vendaId, updatedVenda, (err) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.redirect('/vendas');
            });
        });
    },

    deleteVenda: (req, res) => {
        const vendaId = req.params.id;

        Venda.delete(vendaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    searchVendas: (req, res) => {
        const search = req.query.search || '';

        Venda.searchByUserId(search, (err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ vendas });
        });
    }
};

module.exports = vendaController;
