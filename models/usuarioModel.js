const db = require('../config/db');

const usuario = {
    create: (usuario, callback) => {
        const query = 'INSERT INTO usuario (id, nome, idade, senha, pontuacao) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [usuario.id, usuario.nome, usuario.idade, usuario.senha, usuario.pontuacao], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM usuario WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, usuario, callback) => {
        const query = 'UPDATE usuario SET nome = ?, idade = ?, senha = ?, pontuacao = ? WHERE id = ?';
        db.query(query, [usuario.nome, usuario.idade, usuario.senha, usuario.pontuacao, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM usuario WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM usuario';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = usuario;
