const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Marca = sequelize.define('Marca', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'marca',
  timestamps: false
});

Marca.createMarca = async (marca) => {
  const novaMarca = await Marca.create({ nome: marca.nome });
  return novaMarca.id;
};

Marca.findById = async (id) => {
  return await Marca.findByPk(id);
};

Marca.findByMarcaname = async (nome) => {
  return await Marca.findOne({ where: { nome } });
};

Marca.updateMarca = async (id, marca) => {
  return await Marca.update(
    { nome: marca.nome },
    { where: { id } }
  );
};

Marca.deleteMarca = async (id) => {
  return await Marca.destroy({ where: { id } });
};

Marca.getAll = async () => {
  return await Marca.findAll();
};

module.exports = Marca;