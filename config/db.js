const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // pode trocar pra true se quiser ver queries no terminal
    dialectOptions: {
      // Tentar criar o banco de dados se não existir
      createDatabaseIfNotExist: true,
    },
  }
);

// Testa a conexão
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL com Sequelize.'))
  .catch((err) => console.error('Erro ao conectar com o banco:', err));

module.exports = sequelize;
