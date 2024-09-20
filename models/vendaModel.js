const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (id_user, id_produto, quantidade, valor_total, data) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.id_user, venda.id_produto, venda.quantidade, venda.valor_total, venda.data], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM vendas WHERE id_vendas = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET id_user = ?, id_produto = ?, quantidade = ?, valor_total = ?, data = ? WHERE id_vendas = ?';
        db.query(query, [venda.id_user, venda.id_produto, venda.quantidade, venda.valor_total, venda.data, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id_vendas = ?';
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

    findByUserId: (id_user, callback) => {
        const query = 'SELECT * FROM vendas WHERE id_user = ?';
        db.query(query, [id_user], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Venda;
