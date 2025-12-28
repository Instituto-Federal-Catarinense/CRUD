// services/usuarioService.js
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize'); // Para usar operadores como LIKE

const UsuarioService = {
    create: async (usuario) => {
        const novo = await Usuario.create({
            usuarioname: usuario.usuarioname,
            password: usuario.password,
            role: usuario.role
        });
        return novo.id;
    },

    findById: async (id) => {
        return await Usuario.findByPk(id);
    },

    findByUsuarioname: async (usuarioname) => {
        return await Usuario.findOne({ where: { usuarioname } });
    },

    update: async (id, usuario) => {
        await Usuario.update({
            usuarioname: usuario.usuarioname,
            password: usuario.password,
            role: usuario.role
        }, {
            where: { id }
        });
        return await Usuario.findByPk(id); // retorna o registro atualizado
    },

    delete: async (id) => {
        return await Usuario.destroy({ where: { id } });
    },

    getAll: async () => {
        return await Usuario.findAll();
    },

    searchByName: async (name) => {
        return await Usuario.findAll({
            where: {
                usuarioname: {
                    [Op.like]: `%${name}%`
                }
            }
        });
    }
};

module.exports = UsuarioService;
