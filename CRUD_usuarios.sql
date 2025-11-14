DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','usuario') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `usuarios` WRITE;

INSERT INTO `usuarios` VALUES (1,'Luísa','123','admin'),(2,'Rubia','123','usuario'),(3,'Maria','123','usuario'),(4,'Joédio','123','usuario'),(5,'Jefferson','123','usuario'),(6,'Sandra','123','usuario'),(7,'Júnior','123','usuario'),(8,'Armando','123','usuario'),(9,'Cleber','123','usuario'),(10,'Jardel','123','usuario');

UNLOCK TABLES;
