const { sequelize, Sequelize } = require('../config/sequelize');
const Categoria = require('./categoria');

const Fornecedor = sequelize.define('Fornecedor', {
    nome: { type: Sequelize.STRING, allowNull: false },
    categoria: { type: Sequelize.INTEGER, allowNull: false },
}, {
    tableName: 'fornecedores',
    timestamps: false,
});

// Associação
Fornecedor.belongsTo(Categoria, { foreignKey: 'categoria' });
Categoria.hasMany(Fornecedor, { foreignKey: 'categoria' });

module.exports = Fornecedor;
