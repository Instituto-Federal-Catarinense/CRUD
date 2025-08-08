const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false
});

module.exports = Categoria;