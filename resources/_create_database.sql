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
  `size` varchar(15) NOT NULL,
  `price` decimal(7,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id_procuct` (`id`),
  KEY `fk_product_color_idx` (`color`),
  CONSTRAINT `fk_product_color` FOREIGN KEY (`color`) REFERENCES `colors` (`id`)
);

CREATE TABLE `db_market`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL DEFAULT now(),
  `description` VARCHAR(100) NULL,
  `payment` TINYINT NOT NULL COMMENT '0 = DINHEIRO\n1 = CARTAO\n2 = CHEQUE',
  `customer` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_order` (`id` ASC) INVISIBLE,
  INDEX `fk_order_customer_idx` (`customer` ASC) VISIBLE,
  CONSTRAINT `fk_order_customer`
    FOREIGN KEY (`customer`)
    REFERENCES `db_market`.`customers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `db_market`.`order_products` (
  `order` INT NOT NULL,
  `product` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`order`, `product`));
