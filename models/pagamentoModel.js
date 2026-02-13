const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se que exporta uma instância Sequelize

const Pagamento = sequelize.define('Pagamento', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'pagamento',
    timestamps: false
});

module.exports = {
    create: async (pagamento, callback) => {
        try {
            const result = await Pagamento.create({ nome: pagamento.nome, descricao: pagamento.descricao });
            callback(null, result.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: async (id, callback) => {
        try {
            const result = await Pagamento.findByPk(id);
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },

    update: async (id, pagamento, callback) => {
        try {
            const [updated] = await Pagamento.update(
                { nome: pagamento.nome, descricao: pagamento.descricao },
                { where: { id } }
            );
            callback(null, updated);
        } catch (err) {
            callback(err);
        }
    },

    delete: async (id, callback) => {
        try {
            const deleted = await Pagamento.destroy({ where: { id } });
            callback(null, deleted);
        } catch (err) {
            callback(err);
        }
    },

    getAll: async (callback) => {
        try {
            const results = await Pagamento.findAll();
            callback(null, results);
        } catch (err) {
            callback(err);
        }
    }
}; 