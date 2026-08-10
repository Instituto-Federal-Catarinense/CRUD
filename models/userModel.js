const db = require('../config/db');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const User = {
    create: (user, callback) => {
        bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
            if (err) {
                return callback(err);
            }

            const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
            db.query(query, [user.username, hash, user.role], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results.insertId);
            });
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Se user.password vier vazio/undefined, a senha atual é mantida
    // (permite editar usuário sem ser obrigado a redefinir a senha).
    update: (id, user, callback) => {
        if (!user.password) {
            const query = 'UPDATE users SET username = ?, role = ? WHERE id = ?';
            return db.query(query, [user.username, user.role, id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        }

        bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
            if (err) {
                return callback(err);
            }

            const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
            db.query(query, [user.username, hash, user.role, id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByName: (name, callback) => {
        const query = 'SELECT * FROM users WHERE username LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = User;
