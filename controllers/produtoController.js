const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
  // Renderiza o formulário para criar produto, enviando as categorias disponíveis
  renderCreateForm: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.render('produtos/create', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Cria um novo produto
  createProduto: async (req, res) => {
    try {
      const newProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: parseFloat(req.body.preco),
        quantidade: parseInt(req.body.quantidade, 10),
        categoria: req.body.categoria,
      };

      if (!newProduto.nome || isNaN(newProduto.preco) || isNaN(newProduto.quantidade) || !newProduto.categoria) {
        return res.status(400).json({ error: 'Dados inválidos para produto. Verifique todos os campos.' });
      }

      await Produto.create(newProduto);
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca um produto pelo ID incluindo dados da categoria
  getProdutoById: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const produto = await Produto.findByPk(produtoId, {
        include: {
          model: Categoria,
          as: 'categoriaDetalhes',
        },
      });

      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.render('produtos/show', { produto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todos os produtos, podendo filtrar por categoria
  getAllProdutos: async (req, res) => {
    try {
      const categoria = req.query.categoria || null;
      const whereClause = categoria ? { categoria: categoria } : {};

      const produtos = await Produto.findAll({
        where: whereClause,
        include: {
          model: Categoria,
          as: 'categoriaDetalhes',
        },
      });

      const categorias = await Categoria.findAll();

      res.render('produtos/index', {
        produtos,
        categorias,
        categoriaSelecionada: categoria,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Renderiza o formulário para editar um produto
  renderEditForm: async (req, res) => {
    try {
      const produtoId = req.params.id;
      console.log(`Tentando renderizar formulário de edição para o ID: ${produtoId}`); // LOG DE DEBUG

      const produto = await Produto.findByPk(produtoId, {
        include: {
          model: Categoria,
          as: 'categoriaDetalhes',
        },
      });

      if (!produto) {
        console.error(`ERRO: Produto com ID ${produtoId} não foi encontrado.`); // LOG DE ERRO
        return res.status(404).render('404', { message: 'Produto não encontrado' });
      }

      const categorias = await Categoria.findAll();
      res.render('produtos/edit', { produto, categorias });
    } catch (err) {
      console.error('Erro ao renderizar formulário de edição:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza dados de um produto específico
  updateProduto: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const updatedProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: parseFloat(req.body.preco),
        quantidade: parseInt(req.body.quantidade, 10),
        categoria: req.body.categoria,
      };

      if (!updatedProduto.nome || isNaN(updatedProduto.preco) || isNaN(updatedProduto.quantidade) || !updatedProduto.categoria) {
        return res.status(400).json({ error: 'Dados inválidos para atualização' });
      }

      const [updatedRows] = await Produto.update(updatedProduto, {
        where: { id: produtoId },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta um produto
  deleteProduto: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const deletedRows = await Produto.destroy({
        where: { id: produtoId },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = produtoController;