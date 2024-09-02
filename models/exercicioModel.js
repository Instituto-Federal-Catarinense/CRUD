const db = require('../config/db');

const exercicio = {
    create: (exercicio, callback) => {
        const query = `
            INSERT INTO exercicios (exercicio1, exercicio2, exercicio3, exercicio4, repeticao, serie, duracao, aplicabilidade, musicas) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [exercicio.exercicio1, exercicio.exercicio2, exercicio.exercicio3, exercicio.exercicio4, exercicio.repeticao, exercicio.serie, exercicio.duracao, exercicio.aplicabilidade, exercicio.musica], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM exercicios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, exercicio, callback) => {
        const query = `
            UPDATE exercicios SET exercicio1 = ?, exercicio2 = ?, exercicio3 = ?, exercicio4 = ?, repeticao = ?, serie = ?, duracao = ?, aplicabilidade = ?, musicas = ? 
            WHERE id = ?
        `;
        db.query(query, [exercicio.exercicio1, exercicio.exercicio2, exercicio.exercicio3, exercicio.exercicio4, exercicio.repeticao, exercicio.serie, exercicio.duracao, exercicio.aplicabilidade, exercicio.musica, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM exercicios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM exercicios';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = exercicio;
