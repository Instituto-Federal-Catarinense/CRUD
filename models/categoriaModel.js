const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Produto = require('./produtoModel')

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categorias',  // Nome da tabela no banco de dados
    timestamps: false         // Desabilita os campos `createdAt` e `updatedAt`
});

module.exports = Categoria;
