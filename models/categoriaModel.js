const { readData, saveData } = require('../config/storage');

const Categoria = {
    create: (categoria, callback) => {
        try {
            const data = readData();
            const id = data.nextIds.categorias++;
            const newCategoria = { id, nome: categoria.nome };
            data.categorias.push(newCategoria);
            saveData(data);
            callback(null, id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const categoria = data.categorias.find(c => c.id == id);
            callback(null, categoria);
        } catch (err) {
            callback(err);
        }
    },

    findByCategorianame: (nome, callback) => {
        try {
            const data = readData();
            const categoria = data.categorias.find(c => c.nome.toLowerCase() === (nome || '').toLowerCase());
            callback(null, categoria);
        } catch (err) {
            callback(err);
        }
    },

    update: (id, categoria, callback) => {
        try {
            const data = readData();
            const index = data.categorias.findIndex(c => c.id == id);
            if (index !== -1) {
                data.categorias[index].nome = categoria.nome;
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
            data.categorias = data.categorias.filter(c => c.id != id);
            saveData(data);
            callback(null, { affectedRows: 1 });
        } catch (err) {
            callback(err);
        }
    },

    getAll: (callback) => {
        try {
            const data = readData();
            callback(null, data.categorias);
        } catch (err) {
            callback(err);
        }
    },
};

module.exports = Categoria;