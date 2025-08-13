const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {

    createProduto: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoria } = req.body;

            await Produto.create({
                nome,
                descricao,
                preco,
                quantidade,
                categoriaId: categoria // chave estrangeira
            });

            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produtoId = req.params.id;

            const produto = await Produto.findByPk(produtoId, {
                include: Categoria
            });

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;

            let whereClause = {};
            if (categoria) {
                whereClause = { categoriaId: categoria };
            }

            const produtos = await Produto.findAll({
                where: whereClause,
                include: Categoria
            });

            const categorias = await Categoria.findAll();

            res.render('produtos/index', {
                produtos,
                categorias,
                categoriaSelecionada: categoria
            });
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
            const produtoId = req.params.id;
            const produto = await Produto.findByPk(produtoId);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const { nome, descricao, preco, quantidade, categoria } = req.body;

            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            await produto.update({
                nome,
                descricao,
                preco,
                quantidade,
                categoriaId: categoria
            });

            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findByPk(produtoId);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            await produto.destroy();
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;
