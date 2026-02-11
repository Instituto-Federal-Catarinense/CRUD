const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'vendas',
  timestamps: false
});

module.exports = Venda;
