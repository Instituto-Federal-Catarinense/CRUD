const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/store.json');

const initialData = {
    categorias: [
        { id: 1, nome: 'Eletrônicos' },
        { id: 2, nome: 'Roupas' },
        { id: 3, nome: 'Alimentos' }
    ],
    produtos: [
        { id: 1, nome: 'Smartphone X', descricao: 'Smartphone top de linha', preco: 2500.00, quantidade: 10, categoria: 1 },
        { id: 2, nome: 'Camiseta Algodão', descricao: 'Camiseta 100% algodão', preco: 49.90, quantidade: 30, categoria: 2 },
        { id: 3, nome: 'Chocolate Amargo', descricao: 'Barra de chocolate 70%', preco: 12.50, quantidade: 50, categoria: 3 }
    ],
    users: [
        { id: 1, username: 'admin', password: '123', role: 'admin' },
        { id: 2, username: 'joao', password: '123', role: 'user' }
    ],
    vendas: [
        { id: 1, data: '2026-08-04', valor: 2500.00, quantidade: 1, produto_id: 1 }
    ],
    nextIds: {
        categorias: 4,
        produtos: 4,
        users: 3,
        vendas: 2
    }
};

function ensureFileExists() {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2), 'utf-8');
    }
}

function readData() {
    ensureFileExists();
    try {
        const content = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        return initialData;
    }
}

function saveData(data) {
    ensureFileExists();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
    readData,
    saveData
};
