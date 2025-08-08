
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Time = sequelize.define('Time', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_fundacao: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'times',
  timestamps: false
});

module.exports = Time;
