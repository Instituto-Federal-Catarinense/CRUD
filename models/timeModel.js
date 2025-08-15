const db = require('../config/db');

const Time = {
    create: (time, callback) => {
        const query = 'INSERT INTO times (nome, cidade, pais, data_fundacao) VALUES (?, ?, ?, ?)';
        db.query(
            query,
            [time.nome, time.cidade, time.pais, time.data_fundacao],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results.insertId);
            }
        );
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM times WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByTimename: (nome, callback) => {
        const query = 'SELECT * FROM times WHERE nome = ?';
        db.query(query, [nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, time, callback) => {
        const query = 'UPDATE times SET nome = ?, cidade = ?, pais = ?, data_fundacao = ? WHERE id = ?';
        db.query(
            query,
            [time.nome, time.cidade, time.pais, time.data_fundacao, id],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            }
        );
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM times WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM times';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Time;
