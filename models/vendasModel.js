const db = require('../config/db');  // Importa a configuração do banco de dados

const Venda = {
    // Função para criar uma nova venda
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (idUser, idProduct, quantidade, valorTotal, DataVenda) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.idUser, venda.idProduct, venda.quantidade, venda.valorTotal, venda.DataVenda], (err, results) => {
            if (err) {
                return callback(err);  // Retorna erro em caso de falha
            }
            callback(null, results.insertId);  // Retorna o ID da nova venda criada
        });
    },

    // Função para buscar uma venda pelo ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);  // Retorna erro em caso de falha
            }
            callback(null, results[0]);  // Retorna o resultado da busca
        });
    },

    // Função para atualizar uma venda
    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET idUser = ?, idProduct = ?, quantidade = ?, valorTotal = ?, DataVenda = ? WHERE id = ?';
        db.query(query, [venda.idUser, venda.idProduct, venda.quantidade, venda.valorTotal, venda.DataVenda, id], (err, results) => {
            if (err) {
                return callback(err);  // Retorna erro em caso de falha
            }
            callback(null, results);  // Retorna o resultado da operação de atualização
        });
    },

    // Função para deletar uma venda
    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);  // Retorna erro em caso de falha
            }
            callback(null, results);  // Retorna o resultado da exclusão
        });
    },

    // Função para obter todas as vendas
    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);  // Retorna erro em caso de falha
            }
            callback(null, results);  // Retorna todas as vendas
        });
    },

    // Função para buscar vendas por nome de produto ou ID de usuário
    searchByProductOrUser: (search, callback) => {
        const query = `
            SELECT * FROM vendas 
            WHERE idProduct IN (SELECT id FROM produtos WHERE nome LIKE ?)
            OR idUser IN (SELECT id FROM users WHERE username LIKE ?)`;
        db.query(query, [`%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                return callback(err);  // Retorna erro em caso de falha
            }
            callback(null, results);  // Retorna os resultados da busca
        });
    },
};

module.exports = Venda;  // Exporta o modelo para ser usado em outros arquivos
