const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome_produto: { type: DataTypes.STRING, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  preco: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;