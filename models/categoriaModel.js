const { readData, saveData } = require('../config/dataStore');

const Categoria = {
    create: (categoria, callback) => {
        try {
            const data = readData();
            const nextCategoriaId = Math.max(0, ...data.categorias.map(c => c.id)) + 1;
            const newCategoria = {
                id: nextCategoriaId,
                nome: categoria.nome
            };
            if (!data.categorias) data.categorias = [];
            data.categorias.push(newCategoria);
            saveData(data);
            callback(null, newCategoria.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const categoria = data.categorias.find(c => c.id === id);
            callback(null, categoria || null);
        } catch (err) {
            callback(err);
        }
    },

    findByCategorianame: (nome, callback) => {
        try {
            const data = readData();
            const categoria = data.categorias.find(c => c.nome === nome);
            callback(null, categoria || null);
        } catch (err) {
            callback(err);
        }
    },

    update: (id, categoria, callback) => {
        try {
            const data = readData();
            const index = data.categorias.findIndex(c => c.id === id);
            if (index !== -1) {
                data.categorias[index].nome = categoria.nome;
                saveData(data);
                callback(null, { affectedRows: 1 });
            } else {
                callback(null, { affectedRows: 0 });
            }
        } catch (err) {
            callback(err);
        }
    },

    delete: (id, callback) => {
        try {
            const data = readData();
            const index = data.categorias.findIndex(c => c.id === id);
            if (index !== -1) {
                data.categorias.splice(index, 1);
                saveData(data);
                callback(null, { affectedRows: 1 });
            } else {
                callback(null, { affectedRows: 0 });
            }
        } catch (err) {
            callback(err);
        }
    },

    getAll: (callback) => {
        try {
            const data = readData();
            callback(null, data.categorias || []);
        } catch (err) {
            callback(err);
        }
    },
};


module.exports = Categoria;