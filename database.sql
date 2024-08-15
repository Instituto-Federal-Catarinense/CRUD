CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);
CREATE TABLE Fornecedor (
    FornecedorID INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ_CPF VARCHAR(20) UNIQUE NOT NULL,
    Nome VARCHAR(100),
    Telefone VARCHAR(15),
    Email VARCHAR(100)
);

CREATE TABLE Item (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    Codigo VARCHAR(50) UNIQUE NOT NULL,
    Marca VARCHAR(50),
    FornecedorID INT,
    FOREIGN KEY (FornecedorID) REFERENCES Fornecedor(FornecedorID)
);

CREATE TABLE Produto (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Descricao TEXT,
    DataValidade DATE,
    DataFabricacao DATE,
    PrecisaRefrigeracao BOOLEAN,
    QuantidadeEstoque INT,
    COD VARCHAR(50) UNIQUE NOT NULL,
    ItemID INT,
    FOREIGN KEY (ItemID) REFERENCES Item(ItemID)
);

CREATE TABLE Pedido (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    Quantidade INT,
    Descricao TEXT,
    COD VARCHAR(50) UNIQUE NOT NULL,
    ItemID INT,
    FOREIGN KEY (ItemID) REFERENCES Item(ItemID)
);

CREATE TABLE Cliente (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    CPF VARCHAR(20) UNIQUE NOT NULL,
    Nome VARCHAR(100),
    Telefone VARCHAR(15),
    Email VARCHAR(100)
);

CREATE TABLE Compra (
    CompraID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    PedidoID INT,
    DataCompra DATE,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID),
    FOREIGN KEY (PedidoID) REFERENCES Pedido(PedidoID)
);
