const db = require('../config/db');

const FormaPagamento = {
    getAll: (callback) => {
        const query = 'SELECT * FROM formas_pagamento';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = FormaPagamento;
