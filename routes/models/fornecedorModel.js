const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Fornecedor extends Model {}

Fornecedor.init({
    tema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_fornecedor: {
        type: DataTypes.DATE,
        allowNull: false
    }
    // Adicione outros campos conforme necessário, como produto, se existir na tabela
}, {
    sequelize,
    modelName: 'Fornecedor',
    tableName: 'fornecedores',
    timestamps: false
});

module.exports = Fornecedor;