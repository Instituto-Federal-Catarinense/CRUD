const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Categoria = require('./categoriaModel');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  categoria: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'produtos',
  timestamps: false
});

Produto.belongsTo(Categoria, { foreignKey: 'categoria', as: 'categoriaInfo' });

module.exports = Produto;
