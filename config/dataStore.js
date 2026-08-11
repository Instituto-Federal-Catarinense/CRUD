const fs = require('fs');
const path = require('path');

// Caminho do arquivo de dados
const dataFilePath = path.join(__dirname, '../data/users.json');
const dataDir = path.join(__dirname, '../data');

// Garante que o diretório existe
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Inicializa o arquivo de dados se não existir
if (!fs.existsSync(dataFilePath)) {
    const initialData = {
        users: [
            {
                id: 1,
                username: 'admin',
                password: '$2a$10$N9qo8uLOickgx2ZMRZoHyeIjZAgcg7b3XeKeJTmYoS9.lmjSVfDFm', // senha: admin123 (hash bcrypt)
                role: 'admin'
            },
            {
                id: 2,
                username: 'user',
                password: '$2a$10$kDgQ8cJHJ1LbV0Pll5zXy.aE5eYRmJfkBJrKJgqF0F2Ly3P5gEVri', // senha: user123 (hash bcrypt)
                role: 'user'
            }
        ],
        nextId: 3
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
}

// Lê os dados do arquivo
const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler arquivo de dados:', err);
        return { users: [], nextId: 1 };
    }
};

// Salva os dados no arquivo
const saveData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Erro ao salvar arquivo de dados:', err);
    }
};

module.exports = {
    readData,
    saveData,
    dataFilePath
};
