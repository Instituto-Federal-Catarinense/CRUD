DROP DATABASE IF EXISTS CRUD;
CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    categoria INT NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categorias(id)
);

-- Inserir 3 usuários
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'admin'),
('user1', 'pass1', 'user'),
('user2', 'pass2', 'user');

-- Inserir 3 categorias
INSERT INTO categorias (nome) VALUES
('Eletrônicos'),
('Roupas'),
('Alimentos');

-- Inserir 3 produtos
INSERT INTO produtos (nome, descricao, preco, quantidade, categoria) VALUES
('Smartphone', 'Um smartphone moderno', 999.99, 10, 1),
('Camiseta', 'Camiseta de algodão', 29.99, 50, 2),
('Maçã', 'Maçã fresca', 2.50, 100, 3);
