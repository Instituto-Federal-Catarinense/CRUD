const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO venda (quantidade, valor, data_venda, users, produtos) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.quantidade, venda.valor, venda.data_venda, venda.users, venda.produtos], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT venda.id, venda.quantidade, venda.valor, venda.data_venda, users.name AS venda_users, produtos.name AS venda_produtos FROM venda JOIN users ON venda.users = users.id  JOIN produtos ON venda.produtos = produtos.id;';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE venda SET quantidade = ?, valor = ?, data_venda = ?, users = ?, produtos = ? WHERE id = ?';
        db.query(query, [venda.quantidade, venda.valor, venda.data_venda, venda.users, venda.produtos, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM venda WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT venda.id, venda.quantidade, venda.valor, venda.data_venda, AS venda_users FROM venda JOIN users ON venda.users = users.id, AS venda_produtos FROM venda JOIN produtos ON venda.produtos = produtos.id';
        
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }

};

module.exports = Venda;