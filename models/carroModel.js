const db = require('../config/db');

const carro = {
    criar: (car, callback) => {
        const query = 'INSERT INTO carro (modelo, cor, ano) VALUES (?, ?, ?)';
        db.query(query, [car.modelo, car.cor, car.ano], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    encontrarPorId: (id, callback) => {
        const query = 'SELECT * FROM carro WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    encontrarPorModelo: (modelo, callback) => {
        const query = 'SELECT * FROM carro WHERE modelo = ?';
        db.query(query, [modelo], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    atualizar: (id, car, callback) => {
        const query = 'UPDATE carro SET modelo = ?, cor = ?, ano = ? WHERE id = ?';
        db.query(query, [car.modelo, car.cor, car.ano, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    deletar: (id, callback) => {
        const query = 'DELETE FROM carro WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    listarTodos: (callback) => {
        const query = 'SELECT * FROM carro';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = carro;
