const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoriaModel');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  preco: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  categoria: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'produtos',
  timestamps: false
});

// Relacionamento
Produto.belongsTo(Categoria, { foreignKey: 'categoria' });

module.exports = Produto;