const db = require('../config/db');

const Produto = {
    create: (produto, callback) => {
        const query = 'INSERT INTO produto (produtonome, produtoquant, produtopreco) VALUES (?, ?, ?)';
        db.query(query, [produto.produtonome, produto.produtoquant, produto.produtopreco], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM produto WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produto SET produtonome = ?, produtoquant = ?, produtopreco = ? WHERE id = ?';
        db.query(query, [produto.produtonome, produto.produtoquant, produto.produtopreco, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produto WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM produto';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Produto;
