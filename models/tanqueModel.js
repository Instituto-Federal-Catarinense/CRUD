const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Tanque = sequelize.define('Tanque', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'tanques',
  timestamps: false
});

module.exports = Tanque;
