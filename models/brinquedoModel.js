const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Brinquedo = sequelize.define('Brinquedo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  tableName: 'brinquedos', // forçar o nome correto da tabela
  timestamps: false        // desativa createdAt e updatedAt
});

module.exports = Brinquedo;
