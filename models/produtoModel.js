const { readData, saveData } = require('../config/dataStore');

const Produto = {
    create: (produto, callback) => {
        try {
            const data = readData();
            const nextProdutoId = Math.max(0, ...data.produtos.map(p => p.id)) + 1;
            const newProduto = {
                id: nextProdutoId,
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                quantidade: produto.quantidade,
                categoria: produto.categoria
            };
            if (!data.produtos) data.produtos = [];
            data.produtos.push(newProduto);
            saveData(data);
            callback(null, newProduto.id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const produto = data.produtos.find(p => p.id === id);
            if (produto) {
                const categoria = data.categorias.find(c => c.id === produto.categoria);
                const result = {
                    ...produto,
                    categoria_nome: categoria ? categoria.nome : 'Sem categoria'
                };
                callback(null, result);
            } else {
                callback(null, null);
            }
        } catch (err) {
            callback(err);
        }
    },

    update: (id, produto, callback) => {
        try {
            const data = readData();
            const index = data.produtos.findIndex(p => p.id === id);
            if (index !== -1) {
                data.produtos[index] = {
                    id: data.produtos[index].id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    quantidade: produto.quantidade,
                    categoria: produto.categoria
                };
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
            const index = data.produtos.findIndex(p => p.id === id);
            if (index !== -1) {
                data.produtos.splice(index, 1);
                saveData(data);
                callback(null, { affectedRows: 1 });
            } else {
                callback(null, { affectedRows: 0 });
            }
        } catch (err) {
            callback(err);
        }
    },

    getAll: (categoria, callback) => {
        try {
            const data = readData();
            let produtos = data.produtos || [];
            
            if (categoria) {
                produtos = produtos.filter(p => p.categoria === categoria);
            }
            
            // Enriquece com nome da categoria
            const result = produtos.map(p => {
                const cat = data.categorias.find(c => c.id === p.categoria);
                return {
                    ...p,
                    categoria_nome: cat ? cat.nome : 'Sem categoria'
                };
            });
            
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },
    
};

module.exports = Produto;