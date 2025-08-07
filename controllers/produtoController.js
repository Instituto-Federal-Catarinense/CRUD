const { Produto, Categoria, Cor } = require('../models');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            const newProduto = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria,
                cor_id: req.body.cor,
            };
            await Produto.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao criar produto:', err);
            res.status(500).json({ error: err.message });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id, {
                include: ['categoriaInfo'],
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: err.message });
        }
    },

    getAllProdutos: async (req, res) => {
    try {
        const categoriaSelecionada = req.query.categoria || ''; // pega categoria da URL, se houver
        const produtos = await Produto.findAll({
            include: ['categoriaInfo'],
            where: categoriaSelecionada ? { categoria: categoriaSelecionada } : undefined
        });
        const categorias = await Categoria.findAll();
        res.render('produtos/index', { produtos, categorias, categoriaSelecionada });
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: err.message });
    }
},

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            const cores = await Cor.findAll();
            res.render('produtos/create', { categorias, cores });
        } catch (err) {
            console.error('Erro ao carregar formulário de criação:', err);
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            const categorias = await Categoria.findAll();
            const cores = await Cor.findAll();
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/edit', { produto, categorias, cores });
        } catch (err) {
            console.error('Erro ao carregar formulário de edição:', err);
            res.status(500).json({ error: err.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
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
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            await produto.destroy();
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;
