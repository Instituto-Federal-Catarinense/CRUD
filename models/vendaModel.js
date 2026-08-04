const { readData, saveData } = require('../config/storage');

const Venda = {
    create: (venda, callback) => {
        try {
            const data = readData();
            const id = data.nextIds.vendas++;
            const newVenda = {
                id,
                data: venda.data,
                valor: parseFloat(venda.valor) || 0,
                quantidade: parseInt(venda.quantidade, 10) || 0,
                produto_id: parseInt(venda.produto_id, 10) || null
            };
            data.vendas.push(newVenda);
            saveData(data);
            callback(null, id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const venda = data.vendas.find(v => v.id == id);
            callback(null, venda);
        } catch (err) {
            callback(err);
        }
    },

    update: (id, venda, callback) => {
        try {
            const data = readData();
            const index = data.vendas.findIndex(v => v.id == id);
            if (index !== -1) {
                data.vendas[index] = {
                    ...data.vendas[index],
                    data: venda.data,
                    valor: parseFloat(venda.valor) || 0,
                    quantidade: parseInt(venda.quantidade, 10) || 0,
                    produto_id: parseInt(venda.produto_id, 10) || null
                };
                saveData(data);
            }
            callback(null, { affectedRows: index !== -1 ? 1 : 0 });
        } catch (err) {
            callback(err);
        }
    },

    delete: (id, callback) => {
        try {
            const data = readData();
            data.vendas = data.vendas.filter(v => v.id != id);
            saveData(data);
            callback(null, { affectedRows: 1 });
        } catch (err) {
            callback(err);
        }
    },

    getAll: (callback) => {
        try {
            const data = readData();
            callback(null, data.vendas);
        } catch (err) {
            callback(err);
        }
    },
};

module.exports = Venda;
