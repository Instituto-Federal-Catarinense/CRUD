// models/pedidoModel.js

const db = require('../db'); // Supondo que você tenha uma instância do banco de dados

const Pedido = {
    create: (newPedido, callback) => {
        const query = 'INSERT INTO Pedido (Quantidade, Descricao, COD, ItemID) VALUES (?, ?, ?, ?)';
        const values = [newPedido.Quantidade, newPedido.Descricao, newPedido.COD, newPedido.ItemID];
        db.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (pedidoId, callback) => {
        const query = 'SELECT * FROM Pedido WHERE PedidoID = ?';
        db.query(query, [pedidoId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM Pedido';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (pedidoId, updatedPedido, callback) => {
        const query = 'UPDATE Pedido SET Quantidade = ?, Descricao = ?, COD = ?, ItemID = ? WHERE PedidoID = ?';
        const values = [updatedPedido.Quantidade, updatedPedido.Descricao, updatedPedido.COD, updatedPedido.ItemID, pedidoId];
        db.query(query, values, (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    delete: (pedidoId, callback) => {
        const query = 'DELETE FROM Pedido WHERE PedidoID = ?';
        db.query(query, [pedidoId], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Pedido;
