
DROP TABLE IF EXISTS `cor`;

CREATE TABLE `cor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `cor` WRITE;

INSERT INTO `cor` VALUES (1,'Azul'),(2,'Amarelo'),(3,'Rosa'),(4,'Vermelho'),(5,'Verde'),(6,'Roxo'),(7,'Laranja'),(8,'Lilás'),(9,'Marrom'),(10,'Preto'),(11,'Branco'),(12,'Bege');

UNLOCK TABLES;
