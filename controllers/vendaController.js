const Venda = require('../models/vendaModel');
const Produto = require('../models/produtoModel');

const vendaController = {
  // Listar todas as vendas
  getAllVendas: async (req, res) => {
    try {
      const vendas = await Venda.findAll({
        include: {
          model: Produto,
          as: 'produto', // A relação de alias com Produto
          attributes: ['nome'] // Inclui o nome do produto na resposta
        }
      });
      res.render('vendas/index', { vendas });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar vendas' });
    }
  },

  // Buscar uma venda por ID
  getVendaById: async (req, res) => {
    try {
      const id = req.params.id;
      const venda = await Venda.findOne({
        where: { id },
        include: {
          model: Produto,
          as: 'produto', // Alias para produto
          attributes: ['nome']
        }
      });

      if (!venda) {
        return res.status(404).send('Venda não encontrada');
      }

      res.render('vendas/show', { venda });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar venda' });
    }
  },

  // Renderizar o formulário de criação
  renderCreateForm: async (req, res) => {
    try {
      const produtos = await Produto.findAll(); // Busca todos os produtos
      res.render('vendas/create', { produtos });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar produtos');
    }
  },

  // Criar uma nova venda
  createVenda: async (req, res) => {
    try {
      const { data, valor, quantidade, produto_id } = req.body;

      // Criação da venda
      await Venda.create({
        data,
        valor,
        quantidade,
        produto_id
      });

      res.redirect('/vendas');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar venda' });
    }
  },

  // Renderizar o formulário de edição
  renderEditForm: async (req, res) => {
    try {
      const id = req.params.id;
      const venda = await Venda.findOne({
        where: { id },
        include: {
          model: Produto,
          as: 'produto',
          attributes: ['nome']
        }
      });

      if (!venda) {
        return res.status(404).send('Venda não encontrada');
      }

      const produtos = await Produto.findAll();
      res.render('vendas/edit', { venda, produtos });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar dados para edição');
    }
  },

  // Atualizar uma venda
  updateVenda: async (req, res) => {
    try {
      const id = req.params.id;
      const { data, valor, quantidade, produto_id } = req.body;

      const venda = await Venda.findByPk(id); // Busca a venda pelo ID
      if (!venda) {
        return res.status(404).send('Venda não encontrada');
      }

      // Atualiza os campos da venda
      venda.data = data;
      venda.valor = valor;
      venda.quantidade = quantidade;
      venda.produto_id = produto_id;

      await venda.save(); // Salva as alterações

      res.redirect('/vendas');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar venda' });
    }
  },

  // Deletar uma venda
  deleteVenda: async (req, res) => {
    try {
      const id = req.params.id;
      const venda = await Venda.findByPk(id);

      if (!venda) {
        return res.status(404).send('Venda não encontrada');
      }

      await venda.destroy(); // Deleta a venda
      res.redirect('/vendas');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar venda' });
    }
  }
};

module.exports = vendaController;
