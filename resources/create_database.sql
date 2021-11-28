CREATE DATABASE `db_market` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE db_market;

CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `document` varchar(11) NOT NULL,
  `gender` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id_customer` (`id`)
);

CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_colors` (`id`)
);

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `color` int NOT NULL,
  `size` int NOT NULL,
  `value` decimal(7,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id_procuct` (`id`),
  KEY `fk_product_color_idx` (`color`),
  CONSTRAINT `fk_product_color` FOREIGN KEY (`color`) REFERENCES `colors` (`id`)
);
