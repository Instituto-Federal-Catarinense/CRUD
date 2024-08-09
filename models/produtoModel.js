const db = require('../config/db');

const Produto = {
    create: (produto, callback) => {
        const query = 'INSERT INTO produtos (id_cliente, id_produto, id_pedido, data, total, pagto) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [produto.id_cliente, produto.id_produto, produto.id_pedido, produto.data, produto.total, produto.pagto], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produtos SET id_cliente = ?, id_produto = ?, id_pedido = ?, data = ?, total = ?, pagto = ? WHERE id = ?';
        db.query(query, [produto.id_cliente, produto.id_produto, produto.id_pedido, produto.data, produto.total, produto.pagto, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Produto;
