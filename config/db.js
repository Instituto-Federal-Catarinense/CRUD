const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cantina_federal',

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // Faz valores DECIMAL serem retornados como números.
    decimalNumbers: true
});

pool.getConnection((erro, conexao) => {
    if (erro) {
        console.error(
            'Erro ao conectar com o MySQL:',
            erro.message
        );

        return;
    }

    console.log('MySQL conectado com sucesso.');

    conexao.release();
});

module.exports = pool;