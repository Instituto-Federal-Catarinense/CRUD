const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // ajuste conforme seu caminho

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = Categoria;
