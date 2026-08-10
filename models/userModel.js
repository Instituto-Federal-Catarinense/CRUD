const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.run(query, [user.username, user.password, user.role], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.get(query, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.get(query, [username], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    update: (id, user, callback) => {
        const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
        db.run(query, [user.username, user.password, user.role, id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.run(query, [id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.all(query, [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },

    searchByName: (name, callback) => {
        const query = 'SELECT * FROM users WHERE username LIKE ?';
        db.all(query, [`%${name}%`], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },
};

module.exports = User;
