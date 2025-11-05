const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categorias', // Nome da tabela no banco de dados
    timestamps: false        // Desativa os campos createdAt/updatedAt
});

module.exports = Categoria;
