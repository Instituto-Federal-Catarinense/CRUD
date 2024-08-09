const db = require('../config/db');

const perfil = {
    create: (perfil, callback) => {
        const query = 'INSERT INTO users (perfilname, password, role) VALUES (?, ?, ?)';
        db.query(query, [perfil.name, perfil.email, perfil.telefone], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM perfil WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByUsername: (perfilname, callback) => {
        const query = 'SELECT * FROM perfil WHERE perfilname = ?';
        db.query(query, [perfilname], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, user, callback) => {
        const query = 'UPDATE perfil SET perfilname = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [perfil.perfilname, perfil.email, perfil.telefone, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM perfil WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM perfil';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};


module.exports = perfil;
