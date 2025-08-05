const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    usuarioname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = {
    create: async (usuario, callback) => {
        try {
            const result = await Usuario.create({
                usuarioname: usuario.usuarioname,
                password: usuario.password,
                role: usuario.role
            });
            callback(null, result.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: async (id, callback) => {
        try {
            const result = await Usuario.findByPk(id);
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },

    findByUsuarioname: async (usuarioname, callback) => {
        try {
            const result = await Usuario.findOne({ where: { usuarioname } });
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },

    update: async (id, usuario, callback) => {
        try {
            const [updated] = await Usuario.update(
                {
                    usuarioname: usuario.usuarioname,
                    password: usuario.password,
                    role: usuario.role
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
            const deleted = await Usuario.destroy({ where: { id } });
            callback(null, deleted);
        } catch (err) {
            callback(err);
        }
    },

    getAll: async (callback) => {
        try {
            const results = await Usuario.findAll();
            callback(null, results);
        } catch (err) {
            callback(err);
        }
    },

    searchByName: async (name, callback) => {
        try {
            const results = await Usuario.findAll({
                where: {
                    usuarioname: {
                        [Sequelize.Op.like]: `%${name}%`
                    }
                     }
            });
            callback(null, results);
        } catch (err) {
            callback(err);
        }
    }
};