const Brinquedo = require('../models/brinquedoModel');

exports.list = async (req, res) => {
  try {
    const brinquedos = await Brinquedo.findAll();
    res.render('brinquedos/index', { brinquedos });
  } catch (err) {
    console.error('Erro ao buscar brinquedos:', err);
    res.status(500).send('Erro ao carregar brinquedos.');
  }
};

exports.createForm = (req, res) => {
  res.render('brinquedos/create');
};

exports.create = async (req, res) => {
  try {
    await Brinquedo.create(req.body);
    res.redirect('/brinquedos');
  } catch (err) {
    console.error('Erro ao criar brinquedo:', err);
    res.status(500).send('Erro ao criar brinquedo.');
  }
};

exports.editForm = async (req, res) => {
  try {
    const brinquedo = await Brinquedo.findByPk(req.params.id);
    if (!brinquedo) {
      return res.status(404).send('Brinquedo não encontrado');
    }
    res.render('brinquedos/edit', { brinquedo });
  } catch (err) {
    console.error('Erro ao buscar brinquedo:', err);
    res.status(500).send('Erro ao carregar formulário.');
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Brinquedo.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated === 0) {
      return res.status(404).send('Brinquedo não encontrado');
    }
    res.redirect('/brinquedos');
  } catch (err) {
    console.error('Erro ao atualizar brinquedo:', err);
    res.status(500).send('Erro ao atualizar brinquedo.');
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Brinquedo.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0) {
      return res.status(404).send('Brinquedo não encontrado');
    }
    res.redirect('/brinquedos');
  } catch (err) {
    console.error('Erro ao deletar brinquedo:', err);
    res.status(500).send('Erro ao deletar brinquedo.');
  }
};
