const sequelize = require('../config/database');
const Usuario = require('./usuarioModel');
const Categoria = require('./categoriaModel');
const Produto = require('./produtoModel');
const Tempo = require('./tempoModel');

// Definindo associações
Produto.belongsTo(Categoria, { foreignKey: 'categoria' });
Produto.belongsTo(Tempo, { foreignKey: 'tempo' }); // ou o nome real da coluna FK

// Exporte tudo
module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Produto,
  Tempo
};
