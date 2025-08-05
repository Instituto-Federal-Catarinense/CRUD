const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // instância Sequelize

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categorias',
  timestamps: false, // se não usar createdAt/updatedAt
});

module.exports = Categoria;
