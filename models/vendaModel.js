const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (id_users, id_produto, valor_total, quantidade, valor_total, data) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [venda.id_users, venda.id_produto, venda.valor_total, venda.quantidade, venda.valor_total, venda.data], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = `
            SELECT vendas.*, 
                   produtos.nome AS produto_nome, 
                   categorias.nome AS categoria_nome, 
                   users.username AS usuario_nome
            FROM vendas 
            JOIN produtos ON vendas.id_produto = produtos.id
            JOIN categorias ON produtos.categoria = categorias.id
            JOIN users ON vendas.id_users = users.id
            WHERE vendas.id_venda = ?
        `;
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET id_users = ?, id_produto = ?, valor_total = ?, quantidade = ?, valor_total = ?, data = ? WHERE id_venda = ?';
        db.query(query, [venda.id_users, venda.id_produto, venda.valor_total, venda.quantidade, venda.valor_total, venda.data, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id_venda = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = `
            SELECT vendas.*, 
                   produtos.nome AS produto_nome, 
                   categorias.nome AS categoria_nome, 
                   users.username AS usuario_nome
            FROM vendas 
            JOIN produtos ON vendas.id_produto = produtos.id
            JOIN categorias ON produtos.categoria = categorias.id
            JOIN users ON vendas.id_users = users.id
        `;
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Venda;