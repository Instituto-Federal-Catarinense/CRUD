// models/clienteModel.js

const db = require('../db'); // Supondo que você tenha uma instância do banco de dados

const Cliente = {
    create: (newCliente, callback) => {
        const query = 'INSERT INTO Cliente (CPF, Nome, Telefone, Email) VALUES (?, ?, ?, ?)';
        const values = [newCliente.CPF, newCliente.Nome, newCliente.Telefone, newCliente.Email];
        db.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (clienteId, callback) => {
        const query = 'SELECT * FROM Cliente WHERE ClienteID = ?';
        db.query(query, [clienteId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM Cliente';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (clienteId, updatedCliente, callback) => {
        const query = 'UPDATE Cliente SET CPF = ?, Nome = ?, Telefone = ?, Email = ? WHERE ClienteID = ?';
        const values = [updatedCliente.CPF, updatedCliente.Nome, updatedCliente.Telefone, updatedCliente.Email, clienteId];
        db.query(query, values, (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    delete: (clienteId, callback) => {
        const query = 'DELETE FROM Cliente WHERE ClienteID = ?';
        db.query(query, [clienteId], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Cliente;
