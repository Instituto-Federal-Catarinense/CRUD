const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teste = sequelize.define('Teste', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
  tableName: 'testes',
  timestamps: false
});

module.exports = Teste;
