// models/Produto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./Categoria'); // Importa para fazer associação

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id'
        }
    }
}, {
    tableName: 'produtos',
    timestamps: false
});

// Associa produto à categoria
Produto.belongsTo(Categoria, {
    foreignKey: 'categoria',
    as: 'categoriaInfo'
});

module.exports = Produto;
