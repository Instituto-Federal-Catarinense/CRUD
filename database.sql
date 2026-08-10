-- database.sql
CREATE DATABASE
IF NOT EXISTS CRUD;
USE CRUD;

-- Tabela de usuários
CREATE TABLE
IF NOT EXISTS users
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR
(255) NOT NULL UNIQUE,
    password VARCHAR
(255) NOT NULL,
    role ENUM
('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE
IF NOT EXISTS categorias
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR
(255) NOT NULL
);

-- Tabela de produtos
CREATE TABLE
IF NOT EXISTS produtos
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR
(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL
(10,2) NOT NULL,
    quantidade INT NOT NULL,
    categoria INT NOT NULL,
    FOREIGN KEY
(categoria) REFERENCES categorias
(id)
);

-- Inserir algumas categorias iniciais
INSERT INTO categorias
    (nome)
VALUES
    ('Eletrônicos'),
    ('Roupas'),
    ('Alimentos'),
    ('Livros'),
    ('Esportes');