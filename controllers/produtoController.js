const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            const newProduto = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoriaId: req.body.categoria
            };

            await Produto.create(newProduto);
            res.redirect('/produtos');
        } catch (error) {
            console.error('Error creating produto:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findByPk(produtoId, {
                include: [{
                    model: Categoria,
                    as: 'categoria'
                }]
            });

            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            // Formatando para compatibilidade com a view
            const produtoFormatted = {
                ...produto.toJSON(),
                categoria_nome: produto.categoria ? produto.categoria.nome : 'N/A'
            };

            res.render('produtos/show', { produto: produtoFormatted });
        } catch (error) {
            console.error('Error fetching produto:', error);
            res.status(500).json({ error: error.message });
        }
    },
    
    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            
            const whereClause = categoria ? { categoriaId: categoria } : {};
            
            const produtos = await Produto.findAll({
                where: whereClause,
                include: [{
                    model: Categoria,
                    as: 'categoria'
                }],
                order: [['id', 'ASC']]
            });

            const categorias = await Categoria.findAll({
                order: [['nome', 'ASC']]
            });

            // Formatando produtos para compatibilidade com a view
            const produtosFormatted = produtos.map(produto => ({
                ...produto.toJSON(),
                categoria_nome: produto.categoria ? produto.categoria.nome : 'N/A'
            }));

            res.render('produtos/index', { 
                produtos: produtosFormatted, 
                categorias, 
                categoriaSelecionada: categoria 
            });
        } catch (error) {
            console.error('Error fetching produtos:', error);
            res.status(500).json({ error: error.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll({
                order: [['nome', 'ASC']]
            });
            res.render('produtos/create', { categorias });
        } catch (error) {
            console.error('Error fetching categorias for create form:', error);
            res.status(500).json({ error: error.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produtoId = req.params.id;
            
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            const categorias = await Categoria.findAll({
                order: [['nome', 'ASC']]
            });

            // Formatando para compatibilidade com a view
            const produtoFormatted = {
                ...produto.toJSON(),
                categoria: produto.categoriaId
            };

            res.render('produtos/edit', { produto: produtoFormatted, categorias });
        } catch (error) {
            console.error('Error fetching produto for edit:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            
            const updatedProduto = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoriaId: req.body.categoria
            };

            const [updated] = await Produto.update(updatedProduto, {
                where: { id: produtoId }
            });

            if (updated) {
                res.redirect('/produtos');
            } else {
                res.status(404).json({ message: 'Produto not found' });
            }
        } catch (error) {
            console.error('Error updating produto:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const deleted = await Produto.destroy({
                where: { id: produtoId }
            });

            if (deleted) {
                res.redirect('/produtos');
            } else {
                res.status(404).json({ message: 'Produto not found' });
            }
        } catch (error) {
            console.error('Error deleting produto:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = produtoController;