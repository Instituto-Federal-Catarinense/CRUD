-- Criação do banco de dados
CREATE DATABASE yourdbname;

-- Seleciona o banco de dados para uso
USE yourdbname;

-- Criação da tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

-- Criação da tabela de compromissos
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    artist_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('scheduled', 'completed', 'canceled') NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela de pagamentos
CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'cash', 'online') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Inserção de dados de exemplo na tabela de compromissos
INSERT INTO appointments (client_id, artist_id, date, start_time, end_time, status) 
VALUES (1, 1, '2024-08-18', '10:00:00', '11:00:00', 'scheduled');

-- Inserção de dados de exemplo na tabela de pagamentos
-- (Certifique-se de que o ID de appointment_id existe na tabela appointments)
INSERT INTO pagamentos (appointment_id, amount, payment_method, status, transaction_date) 
VALUES (1, 100.00, 'credit_card', 'completed', '2024-08-18T21:12');
