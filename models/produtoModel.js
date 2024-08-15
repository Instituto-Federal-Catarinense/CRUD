// models/produtoModel.js

const db = require('../db'); // Supondo que você tenha uma instância do banco de dados

const Produto = {
    create: (newProduto, callback) => {
        const query = `INSERT INTO Produto (Descricao, DataValidade, DataFabricacao, PrecisaRefrigeracao, QuantidadeEstoque, COD, ItemID)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [newProduto.Descricao, newProduto.DataValidade, newProduto.DataFabricacao, newProduto.PrecisaRefrigeracao, newProduto.QuantidadeEstoque, newProduto.COD, newProduto.ItemID];
        db.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },

    findById: (produtoId, callback) => {
        const query = 'SELECT * FROM Produto WHERE ProdutoID = ?';
        db.query(query, [produtoId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM Produto';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (produtoId, updatedProduto, callback) => {
        const query = `UPDATE Produto SET Descricao = ?, DataValidade = ?, DataFabricacao = ?, PrecisaRefrigeracao = ?, QuantidadeEstoque = ?, COD = ?, ItemID = ?
                        WHERE ProdutoID = ?`;
        const values = [updatedProduto.Descricao, updatedProduto.DataValidade, updatedProduto.DataFabricacao, updatedProduto.PrecisaRefrigeracao, updatedProduto.QuantidadeEstoque, updatedProduto.COD, updatedProduto.ItemID, produtoId];
        db.query(query, values, (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    delete: (produtoId, callback) => {
        const query = 'DELETE FROM Produto WHERE ProdutoID = ?';
        db.query(query, [produtoId], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Produto;
