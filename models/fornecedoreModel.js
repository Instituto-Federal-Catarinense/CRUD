// models/fornecedorModel.js

const db = require('../db'); // Supondo que você tenha uma instância do banco de dados

const Fornecedor = {
    create: (newFornecedor, callback) => {
        const query = 'INSERT INTO Fornecedor (CNPJ_CPF, Nome, Telefone, Email) VALUES (?, ?, ?, ?)';
        const values = [newFornecedor.CNPJ_CPF, newFornecedor.Nome, newFornecedor.Telefone, newFornecedor.Email];
        db.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (fornecedorId, callback) => {
        const query = 'SELECT * FROM Fornecedor WHERE FornecedorID = ?';
        db.query(query, [fornecedorId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM Fornecedor';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (fornecedorId, updatedFornecedor, callback) => {
        const query = 'UPDATE Fornecedor SET CNPJ_CPF = ?, Nome = ?, Telefone = ?, Email = ? WHERE FornecedorID = ?';
        const values = [updatedFornecedor.CNPJ_CPF, updatedFornecedor.Nome, updatedFornecedor.Telefone, updatedFornecedor.Email, fornecedorId];
        db.query(query, values, (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    delete: (fornecedorId, callback) => {
        const query = 'DELETE FROM Fornecedor WHERE FornecedorID = ?';
        db.query(query, [fornecedorId], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Fornecedor;
