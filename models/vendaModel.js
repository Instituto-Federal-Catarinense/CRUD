const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        // Calcula o valor total
        const valor_total = venda.quantidade * venda.preco;

        const query = 'INSERT INTO vendas (usuario_id, produto_id, quantidade, valor_total) VALUES (?, ?, ?, ?)';
        db.query(query, [venda.usuario_id, venda.produto_id, venda.quantidade, valor_total], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT v.id, v.usuario_id, v.produto_id, v.quantidade, v.valor_total, p.preco FROM vendas v JOIN produtos p ON v.produto_id = p.id WHERE v.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, venda, callback) => {
        // Calcula o valor total
        const valor_total = venda.quantidade * venda.preco;

        const query = 'UPDATE vendas SET usuario_id = ?, produto_id = ?, quantidade = ?, valor_total = ? WHERE id = ?';
        db.query(query, [venda.usuario_id, venda.produto_id, venda.quantidade, valor_total, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT v.id, v.usuario_id, v.produto_id, v.quantidade, v.valor_total, p.preco FROM vendas v JOIN produtos p ON v.produto_id = p.id';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByUserId: (userId, callback) => {
        const query = 'SELECT v.id, v.usuario_id, v.produto_id, v.quantidade, v.valor_total, p.preco FROM vendas v JOIN produtos p ON v.produto_id = p.id WHERE v.usuario_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Venda;