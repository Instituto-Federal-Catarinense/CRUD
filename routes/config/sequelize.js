const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CRUD', 'root', 'Isabele', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
