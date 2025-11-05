const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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

Usuario.createUsuario = async (usuario) => {
  const novoUsuario = await Usuario.create({
    usuarioname: usuario.usuarioname,
    password: usuario.password,
    role: usuario.role
  });
  return novoUsuario.id;
};

Usuario.findById = async (id) => {
  return await Usuario.findByPk(id);
};

Usuario.findByUsuarioname = async (usuarioname) => {
  return await Usuario.findOne({ where: { usuarioname } });
};

Usuario.updateUsuario = async (id, usuario) => {
  return await Usuario.update(
    {
      usuarioname: usuario.usuarioname,
      password: usuario.password,
      role: usuario.role
    },
    { where: { id } }
  );
};

Usuario.deleteUsuario = async (id) => {
  return await Usuario.destroy({ where: { id } });
};

Usuario.getAll = async () => {
  return await Usuario.findAll();
};

Usuario.searchByName = async (name) => {
  return await Usuario.findAll({
    where: {
      usuarioname: {
        [require('sequelize').Op.like]: `%${name}%`
      }
    }
  });
};

module.exports = Usuario;
