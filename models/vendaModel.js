const db = require('../config/db');

const Venda = {
    createVenda: (venda, callback) => {
        const query = 'INSERT INTO venda (produtos,  users, quantidade, valor, data_venda) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.produto, venda.user, venda.quantidade, venda.valor, venda.data_venda ], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT venda.id, venda.quantidade, venda.valor, venda.data_venda, users.username AS venda_users, produtos.nome AS venda_produtos FROM venda JOIN users ON venda.users = users.id  JOIN produtos ON venda.produtos = produtos.id;';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    updateVenda: (id, venda, callback) => {
        const query = 'UPDATE venda SET produtos = ?, users = ?, quantidade = ?, valor = ?, data_venda = ?,  WHERE id = ?';
        db.query(query, [venda.produto, venda.user, venda.quantidade, venda.valor, venda.data_venda, id ], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    deleteVenda: (id, callback) => {
        const query = 'DELETE FROM venda WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAllVendas: (callback) => {
        const query = 'SELECT venda.id, venda.quantidade, venda.valor, venda.data_venda, users.username AS venda_users, produtos.nome AS venda_produtos FROM venda JOIN users ON venda.users = users.id  JOIN produtos ON venda.produtos = produtos.id;';
        
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }

};

module.exports = Venda;