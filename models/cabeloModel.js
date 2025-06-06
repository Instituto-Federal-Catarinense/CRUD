const db = require('../config/db');

const Cabelo = {
    create: (cabelo, callback) => {
        const query = 'INSERT INTO cabelos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)';
        db.query(query, [cabelo.nome, cabelo.descricao, cabelo.preco, cabelo.categoria], callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM cabelos WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    update: (id, cabelo, callback) => {
        const query = 'UPDATE cabelos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?';
        db.query(query, [cabelo.nome, cabelo.descricao, cabelo.preco, cabelo.categoria, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM cabelos WHERE id = ?', [id], callback);
    },

    getAll: (callback) => {
        db.query('SELECT * FROM cabelos', callback);
    },

    searchByName: (name, callback) => {
        db.query('SELECT * FROM cabelos WHERE nome LIKE ?', [`%${name}%`], callback);
    }
};

module.exports = Cabelo;