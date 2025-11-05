const sequelize = require('../config/db');
const Categoria = require('./categoriaModel');
const Produto = require('./produtoModel');
const Marca = require('./marcaModel');
const Usuario = require('./usuarioModel');

// Associações
Produto.belongsTo(Categoria, { foreignKey: 'categoria', as: 'categoriaInfo' });

module.exports = {
  sequelize,
  Categoria,
  Produto,
  Marca,
  Usuario
};