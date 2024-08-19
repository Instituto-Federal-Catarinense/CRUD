create database crud;

use crud;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(225) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);