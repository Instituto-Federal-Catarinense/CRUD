const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud', 'root', '2010', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // pode ativar pra debug
});

module.exports = sequelize;
