const vendas = require('../models/vendasModel');
const Categoria = require('../models/categoriaModel');

const vendaController = {

    createvendas: (req, res) => {

        const newvenda = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        venda.create(newvenda, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    getvendasById: (req, res) => {
        const vendaId = req.params.id;

        venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'vendas not found' });
            }
            res.render('vendas/show', { venda });
        });
    },
    
    getAllvendas: (req, res) => {
        const categoria = req.query.categoria || null;
        
        venda.getAll(categoria, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/index', { venda, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'vendas not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/edit', { venda, categorias });
            });
        });
    },

    updatevendas: (req, res) => {
        const vendaId = req.params.id;
        
        const updatedvenda = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        venda.update(vendaId, updatedvenda, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    deletevendas: (req, res) => {
        const vendaId = req.params.id;

        vendas.delete(vendaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    }
};

module.exports = vendaController;