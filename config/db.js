const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nome do banco de dados
    process.env.DB_USER,      // Usuário do banco de dados
    process.env.DB_PASSWORD,  // Senha do banco de dados
    {
        host: process.env.DB_HOST,    // Host do banco de dados
        dialect: 'mysql',             // Dialeto MySQL
        logging: false,               // Desativa os logs SQL, pode ser 'true' se quiser ver as queries no console
    }
);

// Testando a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados MySQL com Sequelize.');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = sequelize;
