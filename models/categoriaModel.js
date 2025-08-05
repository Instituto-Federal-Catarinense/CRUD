const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se que exporta uma instância Sequelize

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = {
    create: async (categoria, callback) => {
        try {
            const result = await Categoria.create({ nome: categoria.nome });
            callback(null, result.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: async (id, callback) => {
        try {
            const result = await Categoria.findByPk(id);
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },

    findByCategorianame: async (nome, callback) => {
        try {
            const result = await Categoria.findOne({ where: { nome } });
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },

    update: async (id, categoria, callback) => {
        try {
            const [updated] = await Categoria.update(
                { nome: categoria.nome },
                { where: { id } }
            );
            callback(null, updated);
        } catch (err) {
            callback(err);
        }
    },

    delete: async (id, callback) => {
        try {
            const deleted = await Categoria.destroy({ where: { id } });
            callback(null, deleted);
        } catch (err) {
            callback(err);
        }
    },

    getAll: async (callback) => {
        try {
            const results = await Categoria.findAll();
            callback(null, results);
        } catch (err) {
            callback(err);
        }
    }
};