const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoriaModel');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoriaId: {   // chave estrangeira para categoria
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id',
        },
        field: 'categoria'  // mapeia para coluna 'categoria' na tabela produtos
    }
}, {
    tableName: 'produtos',
    timestamps: false,
});

// Associação 1:N — Produto pertence a Categoria
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = Produto;
