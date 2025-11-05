const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  categoria: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'produtos',
  timestamps: false
});

module.exports = Produto;