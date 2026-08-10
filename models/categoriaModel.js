const db = require('../config/db');

const Categoria = {
    create: (categoria, callback) => {
        const query = 'INSERT INTO categorias (nome) VALUES (?)';
        db.run(query, [categoria.nome], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM categorias WHERE id = ?';
        db.get(query, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    findByCategorianame: (nome, callback) => {
        const query = 'SELECT * FROM categorias WHERE nome = ?';
        db.get(query, [nome], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    update: (id, categoria, callback) => {
        const query = 'UPDATE categorias SET nome = ? WHERE id = ?';
        db.run(query, [categoria.nome, id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM categorias WHERE id = ?';
        db.run(query, [id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM categorias';
        db.all(query, [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },
};

module.exports = Categoria;