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
<<<<<<< HEAD
    FOREIGN KEY (categoria) REFERENCES categorias(id)
=======
    cor_id INT, 
    FOREIGN KEY (categoria) REFERENCES categorias(id),
    FOREIGN KEY (cor_id) REFERENCES cor(id)
>>>>>>> c228207 (crud com sequelize atualizado)
);
