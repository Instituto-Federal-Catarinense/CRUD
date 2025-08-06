const { Produto, Categoria, Cor } = require('../models');

const produtoController = {
    // Criar um novo produto
    createProduto: async (req, res) => {
        try {
            await Produto.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria,
                cor_id: req.body.cor
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter um produto pelo ID
    getProdutoById: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id, {
                include: [
                    { model: Categoria, as: 'categoria_rel' },
                    { model: Cor, as: 'cor_rel' }
                ]
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter todos os produtos (com filtro por categoria, se houver)
    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const where = categoria ? { categoria } : {};
            const produtos = await Produto.findAll({
                where,
                include: [
                    { model: Categoria, as: 'categoria_rel' },
                    { model: Cor, as: 'cor_rel' }
                ]
            });
            const categorias = await Categoria.findAll();
            res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Renderizar formulário de criação
    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            const cores = await Cor.findAll();
            res.render('produtos/create', { categorias, cores });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Renderizar formulário de edição
    renderEditForm: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            const categorias = await Categoria.findAll();
            const cores = await Cor.findAll();
            res.render('produtos/edit', { produto, categorias, cores });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atualizar produto
    updateProduto: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            await produto.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria,
                cor_id: req.body.cor
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar produto
    deleteProduto: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            await produto.destroy();
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;