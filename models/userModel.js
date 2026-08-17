<<<<<<< Updated upstream
const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [user.username, user.password, user.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
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

    update: (id, user, callback) => {
        const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [user.username, user.password, user.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
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
=======
const db = require('../config/db');

const User = {

    create: (user, callback) => {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

        db.query(query,
            [user.username, user.password, user.role],
            (err, results) => {

                if (err) return callback(err);

                callback(null, results.insertId);
            }
        );
    },

    findById: (id, callback) => {
        db.query(
            'SELECT * FROM users WHERE id = ?',
            [id],
            (err, results) => {

                if (err) return callback(err);

                callback(null, results[0]);
            }
        );
    },

    findByUsername: (username, callback) => {
        db.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (err, results) => {

                if (err) return callback(err);

                callback(null, results[0]);
            }
        );
    },

    update: (id, user, callback) => {

        const query =
            'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';

        db.query(
            query,
            [user.username, user.password, user.role, id],
            (err, results) => {

                if (err) return callback(err);

                callback(null, results);
            }
        );
    },

    delete: (id, callback) => {

        db.query(
            'DELETE FROM users WHERE id = ?',
            [id],
            (err, results) => {

                if (err) return callback(err);

                callback(null, results);
            }
        );
    },

    getAll: (callback) => {

        db.query(
            'SELECT * FROM users',
            (err, results) => {

                if (err) return callback(err);

                callback(null, results);
            }
        );
    },

    searchByName: (name, callback) => {

        db.query(
            'SELECT * FROM users WHERE username LIKE ?',
            [`%${name}%`],
            (err, results) => {

                if (err) return callback(err);

                callback(null, results);
            }
        );
    }

};

module.exports = User;
>>>>>>> Stashed changes
