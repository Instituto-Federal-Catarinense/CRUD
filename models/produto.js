const { sequelize, Sequelize } = require('../config/sequelize');
const Categoria = require('./categoria');

const Produto = sequelize.define('Produto', {
    nome: { type: Sequelize.STRING, allowNull: false },
    descricao: { type: Sequelize.TEXT, allowNull: false },
    preco: { type: Sequelize.DECIMAL(10,2), allowNull: false },
    quantidade: { type: Sequelize.INTEGER, allowNull: false },
    categoria: { type: Sequelize.INTEGER, allowNull: false },
}, {
    tableName: 'produtos',
    timestamps: false,
});

// Associação
Produto.belongsTo(Categoria, { foreignKey: 'categoria' });
Categoria.hasMany(Produto, { foreignKey: 'categoria' });

module.exports = Produto;
