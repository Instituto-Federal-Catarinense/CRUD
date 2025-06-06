CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'usuario') NOT NULL
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

CREATE TABLE timaos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL DEFAULT 'Sem Nome',
    fundacao DATE NOT NULL DEFAULT '2000-01-01',
    jogadores VARCHAR(500) NOT NULL DEFAULT 'alisson',
    cidade VARCHAR(255) NOT NULL DEFAULT 'São Paulo'
);
