const { readData, saveData } = require('../config/storage');

const Produto = {
    create: (produto, callback) => {
        try {
            const data = readData();
            const id = data.nextIds.produtos++;
            const newProduto = {
                id,
                nome: produto.nome,
                descricao: produto.descricao,
                preco: parseFloat(produto.preco) || 0,
                quantidade: parseInt(produto.quantidade, 10) || 0,
                categoria: parseInt(produto.categoria, 10) || null
            };
            data.produtos.push(newProduto);
            saveData(data);
            callback(null, id);
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        try {
            const data = readData();
            const p = data.produtos.find(item => item.id == id);
            if (!p) {
                return callback(null, null);
            }
            const cat = data.categorias.find(c => c.id == p.categoria);
            const produtoWithCat = {
                ...p,
                categoria_nome: cat ? cat.nome : 'Sem Categoria'
            };
            callback(null, produtoWithCat);
        } catch (err) {
            callback(err);
        }
    },

    update: (id, produto, callback) => {
        try {
            const data = readData();
            const index = data.produtos.findIndex(p => p.id == id);
            if (index !== -1) {
                data.produtos[index] = {
                    ...data.produtos[index],
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: parseFloat(produto.preco) || 0,
                    quantidade: parseInt(produto.quantidade, 10) || 0,
                    categoria: parseInt(produto.categoria, 10) || null
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
            data.produtos = data.produtos.filter(p => p.id != id);
            saveData(data);
            callback(null, { affectedRows: 1 });
        } catch (err) {
            callback(err);
        }
    },

    getAll: (categoriaId, callback) => {
        try {
            const data = readData();
            let produtosList = data.produtos;

            if (categoriaId) {
                produtosList = produtosList.filter(p => p.categoria == categoriaId);
            }

            const result = produtosList.map(p => {
                const cat = data.categorias.find(c => c.id == p.categoria);
                return {
                    ...p,
                    categoria_nome: cat ? cat.nome : 'Sem Categoria'
                };
            });

            callback(null, result);
        } catch (err) {
            callback(err);
        }
    },
};

module.exports = Produto;