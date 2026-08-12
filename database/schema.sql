-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: cantina_federal
-- Source Schemata: cantina_federal
-- Created: Thu Jun 11 13:41:21 2026
-- Workbench Version: 8.0.47
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema cantina_federal
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `cantina_federal` ;
CREATE SCHEMA IF NOT EXISTS `cantina_federal` ;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.avaliacoes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`avaliacoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_produto` INT NOT NULL,
  `nota` INT NULL DEFAULT NULL,
  `comentario` VARCHAR(200) NULL DEFAULT NULL,
  `data_avaliacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_avaliacao_cliente` (`id_cliente` ASC) VISIBLE,
  INDEX `fk_avaliacao_produto` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_avaliacao_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `cantina_federal`.`clientes` (`id`),
  CONSTRAINT `fk_avaliacao_produto`
    FOREIGN KEY (`id_produto`)
    REFERENCES `cantina_federal`.`produtos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.clientes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `email` VARCHAR(80) NULL DEFAULT NULL,
  `telefone` VARCHAR(15) NULL DEFAULT NULL,
  `cpf` VARCHAR(14) NULL DEFAULT NULL,
  `instituicao` VARCHAR(80) NULL DEFAULT NULL,
  `id_endereco` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf` (`cpf` ASC) VISIBLE,
  INDEX `fk_cliente_endereco` (`id_endereco` ASC) VISIBLE,
  CONSTRAINT `fk_cliente_endereco`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `cantina_federal`.`enderecos` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.enderecos
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`enderecos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rua` VARCHAR(80) NOT NULL,
  `numero` VARCHAR(10) NULL DEFAULT NULL,
  `bairro` VARCHAR(40) NOT NULL,
  `municipio` VARCHAR(60) NOT NULL,
  `ponto_referencia` VARCHAR(100) NULL DEFAULT NULL,
  `cep` CHAR(9) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.entregas
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`entregas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_pedido` INT NOT NULL,
  `id_endereco` INT NULL DEFAULT NULL,
  `status_entrega` ENUM('AGUARDANDO', 'SAIU_PARA_ENTREGA', 'ENTREGUE', 'CANCELADA') NULL DEFAULT 'AGUARDANDO',
  `data_saida` DATETIME NULL DEFAULT NULL,
  `data_entrega` DATETIME NULL DEFAULT NULL,
  `observacao` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_pedido` (`id_pedido` ASC) VISIBLE,
  INDEX `fk_entrega_endereco` (`id_endereco` ASC) VISIBLE,
  CONSTRAINT `fk_entrega_endereco`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `cantina_federal`.`enderecos` (`id`),
  CONSTRAINT `fk_entrega_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `cantina_federal`.`pedidos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.formas_pagamento
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`formas_pagamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `descricao` (`descricao` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.pedido_itens
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`pedido_itens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_pedido` INT NOT NULL,
  `id_produto` INT NOT NULL,
  `quantidade` INT NOT NULL DEFAULT '1',
  `preco_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) GENERATED ALWAYS AS ((`quantidade` * `preco_unitario`)) STORED,
  PRIMARY KEY (`id`),
  INDEX `fk_item_pedido` (`id_pedido` ASC) VISIBLE,
  INDEX `fk_item_produto` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_item_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `cantina_federal`.`pedidos` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_item_produto`
    FOREIGN KEY (`id_produto`)
    REFERENCES `cantina_federal`.`produtos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.pedidos
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_forma_pagamento` INT NULL DEFAULT NULL,
  `tipo_entrega` ENUM('RETIRADA', 'ENTREGA') NULL DEFAULT 'RETIRADA',
  `status` ENUM('NOVO', 'EM_PREPARO', 'PRONTO', 'EM_ENTREGA', 'ENTREGUE', 'CANCELADO') NULL DEFAULT 'NOVO',
  `valor_total` DECIMAL(10,2) NULL DEFAULT '0.00',
  `observacao` VARCHAR(150) NULL DEFAULT NULL,
  `data_pedido` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_cliente` (`id_cliente` ASC) VISIBLE,
  INDEX `fk_pedido_pagamento` (`id_forma_pagamento` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `cantina_federal`.`clientes` (`id`),
  CONSTRAINT `fk_pedido_pagamento`
    FOREIGN KEY (`id_forma_pagamento`)
    REFERENCES `cantina_federal`.`formas_pagamento` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table cantina_federal.produtos
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cantina_federal`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `descricao` VARCHAR(150) NULL DEFAULT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `tamanho` VARCHAR(20) NULL DEFAULT NULL,
  `imagem_url` VARCHAR(255) NULL DEFAULT NULL,
  `obs` VARCHAR(100) NULL DEFAULT NULL,
  `disponivel` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;
-- ----------------------------------------------------------------------------
-- Tabela usuarios
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cantina_federal`.`usuarios` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `perfil` ENUM(
        'ADMIN',
        'FUNCIONARIO',
        'CLIENTE'
    ) NOT NULL DEFAULT 'CLIENTE',
    `ativo` TINYINT(1) NOT NULL DEFAULT 1,
    `criado_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `atualizado_em` DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    UNIQUE INDEX `uk_usuario_email` (`email` ASC)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;
