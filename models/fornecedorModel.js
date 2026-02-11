const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fornecedor = sequelize.define('Fornecedor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'fornecedores',
  timestamps: false
});

module.exports = Fornecedor;