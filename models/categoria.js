const { sequelize, Sequelize } = require('../config/sequelize');

const Categoria = sequelize.define('Categoria', {
    nome: { type: Sequelize.STRING, allowNull: false, unique: true },
}, {
    tableName: 'categorias',
    timestamps: false,
});

module.exports = Categoria;
