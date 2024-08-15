const mysql = require('mysql2');
const pool = require('../config/db'); // Configure sua conexão com o banco de dados aqui

const Compra = {
    create: (newCompra, callback) => {
        const query = `INSERT INTO Compra (ClienteID, PedidoID, DataCompra) VALUES (?, ?, ?)`;
        pool.query(query, [newCompra.ClienteID, newCompra.PedidoID, newCompra.DataCompra], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = `SELECT * FROM Compra WHERE CompraID = ?`;
        pool.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = `SELECT * FROM Compra`;
        pool.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (id, updatedCompra, callback) => {
        const query = `UPDATE Compra SET ClienteID = ?, PedidoID = ?, DataCompra = ? WHERE CompraID = ?`;
        pool.query(query, [updatedCompra.ClienteID, updatedCompra.PedidoID, updatedCompra.DataCompra, id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    delete: (id, callback) => {
        const query = `DELETE FROM Compra WHERE CompraID = ?`;
        pool.query(query, [id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Compra;
