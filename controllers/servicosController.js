const Servicos = require('../models/servicosModel');
const Categoria = require('../models/categoriaModel');

const servicosController = {

    createServicos: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoria } = req.body;
            const newServicos = await Servicos.create({
                nome,
                descricao,
                preco,
                quantidade,
                categoria
            });
            res.redirect('/servicos');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getServicosById: async (req, res) => {
        try {
            const servicosId = req.params.id;
            const servicos = await Servicos.findOne({
                where: { id: servicosId },
                include: [{
                    model: Categoria,
                    as: 'categoria', // A associação com Categoria
                    attributes: ['nome']
                }]
            });

            if (!servicos) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }
            res.render('servicos/show', { servicos });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getAllServicos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const servicos = await Servicos.findAll({
                where: categoria ? { categoria } : {},
                include: [{
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome']
                }]
            });
            const categorias = await Categoria.findAll();
            res.render('servicos/index', { servicos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('servicos/create', { categorias });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const servicosId = req.params.id;
            const servicos = await Servicos.findOne({
                where: { id: servicosId },
                include: [{
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome']
                }]
            });

            if (!servicos) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }

            const categorias = await Categoria.findAll();
            res.render('servicos/edit', { servicos, categorias });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    updateServicos: async (req, res) => {
        try {
            const servicosId = req.params.id;
            const { nome, descricao, preco, quantidade, categoria } = req.body;

            const servicos = await Servicos.update(
                { nome, descricao, preco, quantidade, categoria },
                { where: { id: servicosId } }
            );

            if (servicos[0] === 0) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }

            res.redirect('/servicos');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    deleteServicos: async (req, res) => {
        try {
            const servicosId = req.params.id;
            const result = await Servicos.destroy({ where: { id: servicosId } });

            if (result === 0) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }

            res.redirect('/servicos');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = servicosController;
