const db = require('../config/db');

const Text = {
    create: (text, callback) => {
        const query = 'INSERT INTO text (name, telefone, email) VALUES (?, ?, ?)';
        db.query(query, [text.name, text.telefone, text.email], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM text WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM text WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, text, callback) => {
        const query = 'UPDATE text SET name = ?, telefone = ?, email = ? WHERE id = ?';
        db.query(query, [text.name, text.telefone, text.email, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM text WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM text';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByName: (name, callback) => {
        const query = 'SELECT * FROM text WHERE name LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Text;