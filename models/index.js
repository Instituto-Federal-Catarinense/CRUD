const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Produto = require('./Produto');

// Relacionamento
Categoria.hasMany(Produto, { foreignKey: 'categoria' });
Produto.belongsTo(Categoria, { foreignKey: 'categoria' });

module.exports = { sequelize, Usuario, Categoria, Produto };
