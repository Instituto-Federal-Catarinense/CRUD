const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Cor = sequelize.define('Cor', {
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
  tableName: 'cor',      
  timestamps: false      
});

module.exports = Cor;
