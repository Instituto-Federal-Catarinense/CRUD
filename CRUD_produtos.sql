DROP TABLE IF EXISTS `produtos`;

CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `quantidade` int NOT NULL,
  `categoria` int NOT NULL,
  `cor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria` (`categoria`),
  KEY `cor_id` (`cor_id`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `produtos_ibfk_2` FOREIGN KEY (`cor_id`) REFERENCES `cor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `produtos` WRITE;

UNLOCK TABLES;
