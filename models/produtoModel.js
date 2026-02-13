const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categorias',
    timestamps: false
});

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
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
            model: Categoria,
            key: 'id'
        }
    }
}, {
    tableName: 'produtos',
    timestamps: false
});

// Relacionamento
Produto.belongsTo(Categoria, { foreignKey: 'categoria' });

module.exports = {
    create: async (produto, callback) => {
        try {
            const result = await Produto.create({
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                quantidade: produto.quantidade,
                categoria: produto.categoria
            });
            callback(null, result.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: async (id, callback) => {
        try {
            const result = await Produto.findByPk(id, {
                include: [{
                    model: Categoria,
                    attributes: ['nome']
                }]
            });
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },

    update: async (id, produto, callback) => {
        try {
            const [updated] = await Produto.update(
                {
                    nome: produto.nome,
                    preco: produto.preco,
                    descricao: produto.descricao,
                    quantidade: produto.quantidade,
                    categoria: produto.categoria
                },
                { where: { id } }
            );
            callback(null, updated);
        } catch (err) {
            callback(err);
        }
    },

    delete: async (id, callback) => {
        try {
            const deleted = await Produto.destroy({ where: { id } });
            callback(null, deleted);
        } catch (err) {
            callback(err);
        }
    },

    getAll: async (categoria, callback) => {
        try {
            const where = categoria ? { categoria } : {};
            const results = await Produto.findAll({
                where,
                include: [{
                    model: Categoria,
                    attributes: ['nome']
                }]
            });
            callback(null, results);
        } catch (err) {
            callback(err);
        }
    }
};