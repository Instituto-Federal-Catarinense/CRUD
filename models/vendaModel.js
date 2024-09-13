const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (data_venda, valor_total, quantidade, id_produto) VALUES (?, ?, ?, ?)';
        db.query(query, [venda.data_venda, venda.valor_total, venda.quantidade, venda.id_produto], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET data_venda = ?, valor_total = ?, quantidade = ?, id_produto = ? WHERE id = ?';
        db.query(query, [venda.data_venda, venda.valor_total, venda.quantidade, venda.id_produto, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByProductName: (productName, callback) => {
        const query = `
            SELECT vendas.* 
            FROM vendas 
            JOIN produtos ON vendas.id_produto = produtos.id 
            WHERE produtos.nome LIKE ?
        `;
        db.query(query, [`%${productName}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Venda;
