const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

console.log('🔧 Loading database configuration...');
console.log('🔐 ENV:', {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '******' : null,
  DB_HOST: process.env.DB_HOST
});

const sequelize = new Sequelize(
    process.env.DB_NAME || 'CRUD',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            underscored: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;
