const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // aqui usa o DB_NAME (ex: 'CRUD')
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Testa a conexão
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL com Sequelize.'))
  .catch((err) => console.error('Erro ao conectar com o banco:', err));

module.exports = sequelize;
