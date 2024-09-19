const Venda = require('../models/vendaModel');
const Usuario = require('../models/userModel'); 
const Produto = require('../models/produtoModel'); 

const vendaController = {

    createVenda: (req, res) => {
        const newVenda = {
            id_venda: req.body.id_venda,
            id_users: req.body.id_users,
            id_produto: req.body.id_produto,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            precototal: req.body.precototal,
            data: req.body.data
        };

        Venda.create(newVenda, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    getVendaById: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/show', { venda });
        });
    },
    
    getAllVendas: (req, res) => {
        Venda.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Usuario.getAll((err, users) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
            });
            Produto.getAll((err, produtos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }

                console.log('Vendas:', vendas);
                console.log('Users:', users);
                console.log('Produtos:', produtos);
                
                res.render('vendas/index', { vendas, users, produtos });
            });
        });
   },

    renderCreateForm: (req, res) => {
        Usuario.getAll((err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Produto.getAll((err, produtos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/create', { users, produtos });
            });
        });
    },

    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrado!' });
            }

            Usuario.getAll((err, users) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                Produto.getAll((err, produtos) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }
                    res.render('vendas/edit', { venda, users, produtos });
                });
            });
        });
    },

    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        
        const updatedVenda = {
            id_users: req.body.id_users,
            id_produto: req.body.id_produto,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            precototal: req.body.precototal,
            data: req.body.data
        };

        Venda.update(vendaId, updatedVenda, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
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
    }
};

module.exports = vendaController;
