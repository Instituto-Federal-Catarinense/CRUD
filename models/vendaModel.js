const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (data, valor_total, quantidade, produto_id, users_id) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.data, venda.valor_total, venda.quantidade, venda.produto_id, venda.users_id], (err, results) => {
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

    getAll: (callback) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET data = ?, valor_total = ?, quantidade = ?, produto_id = ?, users_id = ? WHERE id = ?';
        db.query(query, [venda.data, venda.valor_total, venda.quantidade, venda.produto_id, venda.users_id, id], (err, results) => {
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

    searchByProductName: (search, callback) => {
        const query = 'SELECT * FROM vendas WHERE produto_id LIKE ?';
        db.query(query, [`%${search}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Venda;
