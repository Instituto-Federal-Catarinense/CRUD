const Categoria = require('../models/categoriaModel');

const categoriaController = {
  // Renderiza o formulário para criar nova categoria
  renderCreateForm: (req, res) => {
    res.render('categorias/create');
  },

  // Cria uma nova categoria no banco
  createCategoria: async (req, res) => {
    try {
      const newCategoria = {
        nome: req.body.nome,
      };

      // Criação da categoria usando o Sequelize
      await Categoria.create(newCategoria);
      res.redirect('/categorias');
    } catch (err) {
      // Tratamento de erro
      res.status(500).json({ error: err.message });
    }
  },

  // Busca uma categoria por ID e a renderiza
  getCategoriaById: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const categoria = await Categoria.findByPk(categoriaId); // Utilizando o findByPk para buscar por ID

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      res.render('categorias/show', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Recupera todas as categorias e as renderiza
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll(); // Busca todas as categorias
      res.render('categorias/index', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Renderiza o formulário de edição da categoria
  renderEditForm: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const categoria = await Categoria.findByPk(categoriaId); // Busca a categoria pelo ID

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      res.render('categorias/edit', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza os dados de uma categoria no banco
  updateCategoria: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const updatedCategoria = {
        nome: req.body.nome,
      };

      const [updatedRows] = await Categoria.update(updatedCategoria, {
        where: { id: categoriaId },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta uma categoria
  deleteCategoria: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const deletedRows = await Categoria.destroy({
        where: { id: categoriaId },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = categoriaController;
