const db = require('../config/db');

const exercicio = {
    create: (exercicio, callback) => {
        // Atualizado para usar o campo 'exercicio' em vez de 'exercicio1', 'exercicio2', etc.
        const query = `
            INSERT INTO exercicios (exercicio, repeticao, serie, duracao, aplicabilidade, musicas) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [exercicio.exercicio, exercicio.repeticao, exercicio.serie, exercicio.duracao, exercicio.aplicabilidade, exercicio.musicas], (err, results) => {
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
        // Atualizado para usar o campo 'exercicio'
        const query = `
            UPDATE exercicios SET exercicio = ?, repeticao = ?, serie = ?, duracao = ?, aplicabilidade = ?, musicas = ? 
            WHERE id = ?
        `;
        db.query(query, [exercicio.exercicio, exercicio.repeticao, exercicio.serie, exercicio.duracao, exercicio.aplicabilidade, exercicio.musicas, id], (err, results) => {
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
