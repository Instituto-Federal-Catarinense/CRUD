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
        logging: false, // ou true, se quiser ver os logs SQL no console
    }
);

// Testar conexão (opcional, mas útil)
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados MySQL com Sequelize.');
    })
    .catch((error) => {
        console.error('Erro ao conectar com Sequelize:', error);
    });

module.exports = sequelize;