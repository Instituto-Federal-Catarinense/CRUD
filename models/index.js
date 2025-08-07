const sequelize = require('../config/database');
const User = require('./user');
const Categoria = require('./Categoria');
const Produto = require('./Produto');
const Capivara = require('./Capivara');

// Definir associações aqui se necessário
// Já definidas no modelo Produto

const models = {
    User,
    Categoria,
    Produto,
    Capivara,
    sequelize
};

module.exports = models;