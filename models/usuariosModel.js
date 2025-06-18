const db = require('../config/db');

const Usuarios = {
    create: (usuarios, callback) => {
        const query = 'INSERT INTO usuarios (usuariosname, password, role) VALUES (?, ?, ?)';
        db.query(query, [usuarios.usuariosname, usuarios.password, usuarios.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByUsuariosname: (usuariosname, callback) => {
        const query = 'SELECT * FROM usuarios WHERE usuariosname = ?';
        db.query(query, [usuariosname], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, usuarios, callback) => {
        const query = 'UPDATE usuarios SET usuariosname = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [usuarios.usuariosname, usuarios.password, usuarios.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM usuarios';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByName: (name, callback) => {
        const query = 'SELECT * FROM usuarios WHERE usuariosname LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },    
};

module.exports = Usuarios;
