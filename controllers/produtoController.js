const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            await Produto.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria // Aqui deve ser o nome exato da FK no model Produto, que parece ser "categoria"
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id, {
                // ERRO: você estava usando `include: Categoria` direto, mas precisa passar o alias que você definiu na associação (ex: 'categoria_info')
                // CORREÇÃO:
                include: { model: Categoria, as: 'categoria_info' } 
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            // ERRO: no where, você usava "categoriaId" mas no model seu campo é "categoria"
            const where = categoria ? { categoria: categoria } : {};

            // ERRO: mesma correção do include para getProdutoById
            const produtos = await Produto.findAll({
                where,
                include: { model: Categoria, as: 'categoria_info' }
            });

            const categorias = await Categoria.findAll();

            res.render('produtos/index', {
                produtos,
                categorias,
                categoriaSelecionada: categoria
            });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateProduto: async (req, res) => {
        try {
            await Produto.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria // Certifique-se que o nome aqui está correto conforme FK no model Produto
            }, {
                where: { id: req.params.id }
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            await Produto.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = produtoController;
