const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Categoria = require('./categoriaModel');
const Produto = require('./produtoModel');

Categoria.hasMany(Produto, { foreignKey: 'categoriaId' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = { sequelize, User, Categoria, Produto };
