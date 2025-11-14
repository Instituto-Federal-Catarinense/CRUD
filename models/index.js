const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud', 'root', 'Be#99493544', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco com Sequelize 🚀'))
  .catch(err => console.error('Erro ao conectar:', err));

module.exports = sequelize;
