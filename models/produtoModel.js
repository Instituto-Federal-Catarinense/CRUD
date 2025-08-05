const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoriaModel');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'produtos',
  timestamps: false,
});

// Definindo associação: Produto pertence a Categoria
Produto.belongsTo(Categoria, {
  foreignKey: 'categoria',
  as: 'categoriaDetalhes'  // alias para incluir os dados da categoria
});

module.exports = Produto;
