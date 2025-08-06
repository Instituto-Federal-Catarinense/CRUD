const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const { Op } = require('sequelize');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const novaCategoria = {
                nome: req.body.nome,
                descricao: req.body.descricao,
            };

            await Categoria.create(novaCategoria);
            res.redirect('/categorias');
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            res.render('categorias/show', { categoria });
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });
            res.render('categorias/index', { categorias });
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            res.status(500).json({ error: error.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            res.render('categorias/edit', { categoria });
        } catch (error) {
            console.error('Erro ao carregar edição da categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const dadosAtualizados = {
                nome: req.body.nome,
                descricao: req.body.descricao,
            };

            const [updated] = await Categoria.update(dadosAtualizados, {
                where: { id: categoriaId }
            });

            if (updated) {
                res.redirect('/categorias');
            } else {
                res.status(404).json({ message: 'Categoria não encontrada' });
            }
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;

            // Excluir produtos relacionados primeiro
            await Produto.destroy({
                where: { categoriaId }
            });

            // Depois excluir a categoria
            const deleted = await Categoria.destroy({
                where: { id: categoriaId }
            });

            if (deleted) {
                res.redirect('/categorias');
            } else {
                res.status(404).json({ message: 'Categoria não encontrada' });
            }
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    searchCategoria: async (req, res) => {
        try {
            const search = req.query.search || '';

            const resultados = await Categoria.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [['id', 'ASC']]
            });

            res.json({ categorias: resultados });
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = categoriaController;
