const { Produto, Categoria } = require('../models'); // Ajuste conforme seu index.js dos models

const produtoController = {

    createProduto: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoria } = req.body;
            await Produto.create({
                nome,
                descricao,
                preco,
                quantidade,
                categoriaId: categoria // Supondo que o campo FK seja categoriaId
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id, {
                include: [{ model: Categoria }]
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const where = categoria ? { categoriaId: categoria } : {};
            const produtos = await Produto.findAll({
                where,
                include: [{ model: Categoria }]
            });
            const categorias = await Categoria.findAll();
            res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoria } = req.body;
            const [updated] = await Produto.update(
                {
                    nome,
                    descricao,
                    preco,
                    quantidade,
                    categoriaId: categoria
                },
                { where: { id: req.params.id } }
            );
            if (!updated) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const deleted = await Produto.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;