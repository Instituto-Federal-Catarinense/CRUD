const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Produto = require('./produto');

const Venda = sequelize.define('Venda', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  produto_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'vendas',
  timestamps: false
});

Venda.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produtoInfo' });

module.exports = Venda;
