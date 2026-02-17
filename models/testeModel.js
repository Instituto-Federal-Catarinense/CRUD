const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teste = sequelize.define('Teste', {
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
  }
}, {
  tableName: 'teste',
  timestamps: false, // Desativando campos como createdAt/updatedAt se não forem necessários
});

module.exports = Teste;
