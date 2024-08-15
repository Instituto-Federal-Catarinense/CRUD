const db = require('../config/db');

const quiz = {
    create: (quiz, callback) => {
        const query = 'INSERT INTO quiz (id, pergunta, alternativa1, alternativa2, alternativa3, alternativa4, respostar) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [quiz.id, quiz.pergunta, quiz.alternativa1, quiz.alternativa2, quiz.alternativa3, quiz.alternativa4, quiz.respostar], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM quiz WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, quiz, callback) => {
        const query = 'UPDATE quiz SET pergunta = ?, alternativa1 = ?, alternativa2 = ?, alternativa3 = ?, alternativa4 = ?, respostar = ? WHERE id = ?';
        db.query(query, [quiz.pergunta, quiz.alternativa1, quiz.alternativa2, quiz.alternativa3, quiz.alternativa4, quiz.respostar, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM quiz WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM quiz';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = quiz;
