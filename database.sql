    CREATE DATABASE Crud;

    USE Crud;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL
    );

    CREATE TABLE musicas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        genero1 TEXT NOT NULL,
        genero2 TEXT NOT NULL,
        genero3 TEXT NOT NULL,
        user INT NOT NULL,
        FOREIGN KEY (users) REFERENCES users(id)
);

    CREATE TABLE exercicios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        exercicio TEXT NOT NULL,
        repeticao INT NOT NULL,
        serie INT NOT NULL,
        duracao time NOT NULL,
        aplicabilidade VARCHAR(255) NOT NULL,
        musicas INT NOT NULL,
        FOREIGN KEY (musicas) REFERENCES musicas(id)
    );
