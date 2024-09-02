const db = require('../config/db');

const musica = {
    create: (musica, callback) => {
        const query = 'INSERT INTO musicas (nome, genero1, genero2, genero3) VALUES (?, ?, ?, ?)';
        db.query(query, [musica.nome, musica.genero1, musica.genero2, musica.genero3], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM musicas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, musica, callback) => {
        const query = 'UPDATE musicas SET nome = ?, genero1 = ?, genero2 = ?, genero3 = ? WHERE id = ?';
        db.query(query, [musica.nome, musica.genero1, musica.genero2, musica.genero3, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM musicas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM musicas';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = musica;
