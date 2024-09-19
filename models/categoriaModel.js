const db = require('../config/db');

const categoria = {
    create: (categoria, callback) => {
        const query = 'INSERT INTO categorias (categorianame, password, role) VALUES (?, ?, ?)';
        db.query(query, [categoria.categorianame, categoria.password, categoria.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM categorias WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findBycategorianame: (categorianame, callback) => {
        const query = 'SELECT * FROM categorias WHERE categorianame = ?';
        db.query(query, [categorianame], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, categoria, callback) => {
        const query = 'UPDATE categorias SET categorianame = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [categoria.categorianame, categoria.password, categoria.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM categorias WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM categorias';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};


module.exports = categoria;
