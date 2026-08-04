CREATE DATABASE IF NOT EXISTS CRUD;

USE CRUD;

-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

-- 2. Tabela de Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- 3. Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    categoria INT NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Inserção de usuários iniciais (Senhas criptografadas com bcrypt):
-- Usuário Administrador: login = admin , senha = admin123
-- Usuário Comum:         login = user  , senha = user123
INSERT INTO users (username, password, role) VALUES 
('admin', '$2b$10$Z/ULnfioMQmI4/i8NQo5.O7nzGRLscQMUrSV1hkk5hf5vZC.vApXG', 'admin'),
('user',  '$2b$10$Deu9xRFxRpODwi9K5mEkiOauLJM11vFZ9d.5Ovi6m5nyd2k3eXvuS', 'user')
ON DUPLICATE KEY UPDATE username=username;
