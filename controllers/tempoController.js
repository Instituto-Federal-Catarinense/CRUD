const Tempo = require('../models/tempoModel');

exports.getAllTempos = async (req, res) => {
  try {
    const tempos = await Tempo.findAll();
    res.render('tempos/index', { tempos });
  } catch (error) {
    console.error('Erro ao listar tempos:', error);
    res.status(500).send('Erro ao listar tempos');
  }
};

exports.renderCreateForm = (req, res) => {
  res.render('tempos/create'); // renderiza a view para criar tempo
};

exports.createTempo = async (req, res) => {
  try {
    const { nome } = req.body;
    await Tempo.create({ nome });
    res.redirect('/tempos');
  } catch (error) {
    console.error('Erro ao criar tempo:', error);
    res.status(500).send('Erro ao criar tempo');
  }
};

exports.getTempoById = async (req, res) => {
  try {
    const tempo = await Tempo.findByPk(req.params.id);
    if (!tempo) {
      return res.status(404).send('Tempo não encontrado');
    }
    res.render('tempos/show', { tempo });
  } catch (error) {
    console.error('Erro ao buscar tempo:', error);
    res.status(500).send('Erro ao buscar tempo');
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const tempo = await Tempo.findByPk(req.params.id);
    if (!tempo) {
      return res.status(404).send('Tempo não encontrado');
    }
    res.render('tempos/edit', { tempo });
  } catch (error) {
    console.error('Erro ao buscar tempo para editar:', error);
    res.status(500).send('Erro ao buscar tempo para editar');
  }
};

exports.updateTempo = async (req, res) => {
  try {
    const tempo = await Tempo.findByPk(req.params.id);
    if (!tempo) {
      return res.status(404).send('Tempo não encontrado');
    }
    tempo.nome = req.body.nome;
    await tempo.save();
    res.redirect('/tempos');
  } catch (error) {
    console.error('Erro ao atualizar tempo:', error);
    res.status(500).send('Erro ao atualizar tempo');
  }
};

exports.deleteTempo = async (req, res) => {
  try {
    const tempo = await Tempo.findByPk(req.params.id);
    if (!tempo) {
      return res.status(404).send('Tempo não encontrado');
    }
    await tempo.destroy();
    res.redirect('/tempos');
  } catch (error) {
    console.error('Erro ao deletar tempo:', error);
    res.status(500).send('Erro ao deletar tempo');
  }
};
