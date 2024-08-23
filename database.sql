USE crud;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produtonome VARCHAR(255) NOT NULL,
    produtoquant INT(20) NOT NULL,
    produtopreco FLOAT(20) NOT NULL
);

