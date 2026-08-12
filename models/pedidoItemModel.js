const db = require('../config/db');

const PedidoItem = {
    create: (item, callback) => {
        const query = 'INSERT INTO pedido_itens (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)';
        db.query(query, [item.id_pedido, item.id_produto, item.quantidade || 1, item.preco_unitario || 0.0], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findByPedidoId: (id_pedido, callback) => {
        const query = 'SELECT pi.*, pr.nome AS produto_nome FROM pedido_itens pi LEFT JOIN produtos pr ON pi.id_produto = pr.id WHERE pi.id_pedido = ?';
        db.query(query, [id_pedido], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    deleteById: (id, callback) => {
        const query = 'DELETE FROM pedido_itens WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = PedidoItem;
