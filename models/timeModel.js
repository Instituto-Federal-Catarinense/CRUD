const db = require('../config/db');

const time = {
    create: (time, callback) => {
        const query = 'INSERT INTO horario (horario, password, role) VALUES (?, ?, ?)';
        db.query(query, [time.horario, time.password, time.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM time WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByHorario: (horario, callback) => {
        const query = 'SELECT * FROM time WHERE horario = ?';
        db.query(query, [horario], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, time, callback) => {
        const query = 'UPDATE horario SET horario = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [time.horario, time.password, time.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM time WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM time';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};


module.exports = time;
