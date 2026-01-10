const { sequelize, Sequelize } = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
    usuarioname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM('admin', 'usuario'),
        allowNull: false,
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;
