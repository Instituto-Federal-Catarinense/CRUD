const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// config/db.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
    host: 'localhost',
    dialect: 'mysql' // ou 'sqlite', 'postgres', etc.
});
module.exports = sequelize;

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
