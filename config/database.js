const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CRUD', 'root', 'senhadobanco', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
