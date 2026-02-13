const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');
const Tempo = require('../models/tempoModel');

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: [
        { model: Categoria, as: 'categoria' },
        { model: Tempo, as: 'tempo' }
      ]
    });
    const categorias = await Categoria.findAll();
    res.render('produtos/index', { produtos, categorias, categoriaSelecionada: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.form = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    const tempos = await Tempo.findAll();
    res.render('produtos/create', { categorias, tempos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade, categoria_id, tempo_id } = req.body;

    await Produto.create({
      nome,
      descricao,
      preco,
      quantidade,
      categoria_id,
      tempo_id
    });

    res.redirect('/produtos');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id, {
      include: [
        { model: Categoria, as: 'categoria' },
        { model: Tempo, as: 'tempo' }
      ]
    });

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    console.log(JSON.stringify(produto, null, 2)); // <-- Adicione aqui
    res.render('produtos/show', { produto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    const categorias = await Categoria.findAll();
    const tempos = await Tempo.findAll();

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    res.render('produtos/edit', { produto, categorias, tempos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade, categoria_id, tempo_id } = req.body;

    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    await produto.update({
      nome,
      descricao,
      preco,
      quantidade,
      categoria_id,
      tempo_id
    });

    res.redirect('/produtos');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    await produto.destroy();
    res.redirect('/produtos');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
