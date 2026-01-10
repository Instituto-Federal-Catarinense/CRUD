const db = require('../config/db');

const Fornecedor = {
    create: (fornecedor, callback) => {
        const query = 'INSERT INTO fornecedores (tema, descricao, data_fornecedor) VALUES (?, ?, ?)';
        db.query(query, [fornecedor.fornecedor, fornecedor.descricao, fornecedor.data_fornecedor, fornecedor.produto], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM fornecedores WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, fornecedor, callback) => {
        const query = 'UPDATE fornecedores SET tema = ?, descricao = ?, data_fornecedor = ? WHERE id = ?';
        db.query(query, [fornecedor.fornecedor, fornecedor.descricao, fornecedor.data_fornecedor, fornecedor.produto, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM fornecedores WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM fornecedores';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Fornecedor;
