const db = require('../config/database');

const User = {
    create: (userData, callback) => {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [userData.username, userData.password, userData.role], callback);
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT id, username, role FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },

    update: (id, userData, callback) => {
        const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [userData.username, userData.password, userData.role, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT id, username, role FROM users';
        db.query(query, callback);
    }
};

module.exports = User;
