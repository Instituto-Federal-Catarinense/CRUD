// models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'categorias',
    timestamps: false, // desativa os campos createdAt e updatedAt se não estiverem na tabela
});

module.exports = Categoria;