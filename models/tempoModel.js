const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tempo = sequelize.define('Tempo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tempos',
  timestamps: false
});

module.exports = Tempo;
