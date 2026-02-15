const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carrega as variáveis do .env
dotenv.config();

// Cria a instância do Sequelize com os dados do .env
const sequelize = new Sequelize(
  process.env.DB_NAME,     // nome do banco
  process.env.DB_USER,     // usuário
  process.env.DB_PASSWORD, // senha
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // desativa os logs SQL no console (pode ativar com true)
  }
);

// Testa a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados MySQL com Sequelize.');
  })
  .catch((err) => {
    console.error('Erro ao conectar com Sequelize:', err.message);
  });

module.exports = sequelize;
