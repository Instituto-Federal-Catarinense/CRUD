const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoria } = req.body;
            const newProduto = await Produto.create({
                nome,
                descricao,
                preco,
                quantidade,
                categoria
            });
            res.redirect('/produtos'); // Redireciona para a lista de produtos
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findOne({
                where: { id: produtoId },
                include: {
                    model: Categoria,
                    attributes: ['nome'] // Inclui o nome da categoria
                }
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    },

    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;

            // Buscando as categorias para passar no filtro
            const categorias = await Categoria.findAll();

            // Buscando todos os produtos com a categoria, se fornecida
            const produtos = await Produto.findAll({
                where: categoria ? { categoria } : {},  // Filtro de categoria se fornecido
                include: {
                    model: Categoria,
                    attributes: ['nome']  // Inclui o nome da categoria
                }
            });

            // Renderiza a página com a lista de produtos e categorias
            res.render('produtos/index', {
                produtos,
                categorias,  // Aqui você passa a variável categorias
                categoriaSelecionada: categoria
            });
        } catch (err) {
            console.error('Erro ao buscar produtos:', err); // Log do erro completo
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar categorias' });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findOne({
                where: { id: produtoId },
                include: {
                    model: Categoria,
                    attributes: ['nome']
                }
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const { nome, descricao, preco, quantidade, categoria } = req.body;
            const produto = await Produto.findOne({ where: { id: produtoId } });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            produto.nome = nome;
            produto.descricao = descricao;
            produto.preco = preco;
            produto.quantidade = quantidade;
            produto.categoria = categoria;
            await produto.save();
            res.redirect('/produtos');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findOne({ where: { id: produtoId } });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            await produto.destroy();
            res.redirect('/produtos');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
};

module.exports = produtoController;
