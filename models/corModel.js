const db = require('../config/db'); // Ajuste conforme sua conexão com o banco de dados

const Cor = {
    create: (cor, callback) => {
        const query = 'INSERT INTO cor (nome) VALUES (?)';
        db.query(query, [cor.nome], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId);
        });
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM cor WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]);
        });
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM cor';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },
    update: (id, cor, callback) => {
        const query = 'UPDATE cor SET nome = ? WHERE id = ?';
        db.query(query, [cor.nome, id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM cor WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
};

module.exports = Cor;
