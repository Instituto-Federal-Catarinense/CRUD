const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se que exporta uma instância do Sequelize

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
    tableName: 'categorias',
    timestamps: false
});

module.exports = Categoria;