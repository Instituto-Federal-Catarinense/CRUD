-- Resetar senha do root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;

-- Criar banco se não existir
CREATE DATABASE IF NOT EXISTS CRUD;
USE CRUD;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Inserir usuário de teste
INSERT IGNORE INTO users (username, password, role) VALUES 
('jorge', '1234', 'user'),
('admin', 'admin123', 'admin');

SELECT * FROM users;
