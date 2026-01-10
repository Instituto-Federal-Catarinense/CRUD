const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Conexão com o banco
const Categoria = require('./categoriaModel'); 

// Definindo o modelo Produto
const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
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
            model: 'categorias', // nome da tabela de categorias
            key: 'id'
        }
    }
}, {
    tableName: 'produtos', // Nome da tabela no banco de dados
    timestamps: false // Desabilitando os campos de timestamps
});

Produto.belongsTo(Categoria, { foreignKey: 'categoria' });

module.exports = Produto;
