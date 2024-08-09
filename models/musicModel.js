const db = require('../config/db');

const Music = {
    create: (music, callback) => {
        const query = 'INSERT INTO musics (musicname, password, role) VALUES (?, ?, ?)';
        db.query(query, [music.username, music.password, music.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM musics WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByUsername: (musicname, callback) => {
        const query = 'SELECT * FROM musics WHERE username = ?';
        db.query(query, [musicname], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, music, callback) => {
        const query = 'UPDATE musics SET musicname = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [music.username, music.password, music.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM musics WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM musics';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};


module.exports = Music;
