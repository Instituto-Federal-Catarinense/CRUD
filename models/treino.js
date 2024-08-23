const db = require('../config/db');

const treino = {
    create: (treino, callback) => {
        const query = 'INSERT INTO treinos (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [treino.username, treino.password, treino.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM treinos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM treinos WHERE username = ?';
        db.query(query, [username], (err, results) => { 
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, treino, callback) => {
        const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [treino.username, treino.password, treino.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM treinos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM treinos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};


module.exports = treino;
