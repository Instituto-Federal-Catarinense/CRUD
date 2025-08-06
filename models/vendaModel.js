const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos', // ou 'Produtos', dependendo do nome da tabela/model
      key: 'id',
    },
  },
}, {
  tableName: 'vendas', // ou 'Venda' se quiser manter o padrão singular
  timestamps: false,
});

module.exports = Venda;
