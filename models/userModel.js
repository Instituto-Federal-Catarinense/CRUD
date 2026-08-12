const db = require('../config/db');
const argon2 = require('argon2');

const User = {
    create: (user, callback) => {
        argon2.hash(user.password, { type: argon2.argon2id })
            .then((hash) => {
                const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
                db.query(query, [user.username, hash, user.role], (err, results) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, results.insertId);
                });
            })
            .catch((err) => callback(err));
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

    verifyPassword: (password, hash, callback) => {
        argon2.verify(hash, password)
            .then((match) => callback(null, match))
            .catch(() => callback(null, false));
    },

    update: (id, user, callback) => {
        if (user.password) {
            argon2.hash(user.password, { type: argon2.argon2id })
                .then((hash) => {
                    const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
                    db.query(query, [user.username, hash, user.role, id], (err, results) => {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, results);
                    });
                })
                .catch((err) => callback(err));
        } else {
            const query = 'UPDATE users SET username = ?, role = ? WHERE id = ?';
            db.query(query, [user.username, user.role, id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        }
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
