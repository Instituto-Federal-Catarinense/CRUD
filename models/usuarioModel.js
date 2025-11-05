const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  usuarioname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

// Métodos estáticos para replicar as funções do model original:

// Criar usuário
Usuario.createUsuario = async (usuario) => {
  return await Usuario.create(usuario);
};

// Buscar por ID
Usuario.findById = async (id) => {
  return await Usuario.findByPk(id);
};

// Buscar por nome de usuário
Usuario.findByUsuarioname = async (usuarioname) => {
  return await Usuario.findOne({ where: { usuarioname } });
};

// Atualizar usuário
Usuario.updateUsuario = async (id, dadosAtualizados) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  return await usuario.update(dadosAtualizados);
};

// Deletar usuário
Usuario.deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  return await usuario.destroy();
};

// Buscar todos usuários
Usuario.getAll = async () => {
  return await Usuario.findAll();
};

// Buscar usuários por nome com filtro LIKE
Usuario.searchByName = async (name) => {
  return await Usuario.findAll({
    where: {
      usuarioname: {
        [Op.like]: `%${name}%`
      }
    }
  });
};

module.exports = Usuario;
