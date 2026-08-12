const bcrypt = require('bcryptjs');
const db = require('../config/db');

const User = {
    create: async (user, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

            db.query(query, [user.username, hashedPassword, user.role], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results.insertId);
            });
        } catch (err) {
            callback(err);
        }
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

    update: async (id, user, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';

            db.query(query, [user.username, hashedPassword, user.role, id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    updatePassword: async (id, password, callback) => {
        try {
            const query = 'UPDATE users SET password = ? WHERE id = ?';
            db.query(query, [password, id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        } catch (err) {
            callback(err);
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
        const query = 'SELECT id, username, role FROM users';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByName: (name, callback) => {
        const query = 'SELECT id, username, role FROM users WHERE username LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = User;
