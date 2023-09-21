CREATE DATABASE  IF NOT EXISTS `azport2`;

USE `azport2`;

CREATE TABLE `categories`(
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(30) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE `products`(
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(100) NOT NULL,
`description` VARCHAR(300) NOT NULL,
`image` VARCHAR(100) NOT NULL,
`color` VARCHAR(45) NOT NULL,
`price` DOUBLE NOT NULL,
`category_id` INT NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`category_id`) REFERENCES `categories`(id)
);

CREATE TABLE `inventories`(
`id` INT NOT NULL AUTO_INCREMENT,
`product_id` INT NOT NULL,
`size` VARCHAR(30) NOT NULL,
`quantity` INT NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`product_id`) REFERENCES `products`(id)
);

ALTER TABLE `products` 
ADD COLUMN `inventory_id` INT NOT NULL AFTER `category_id`,
ADD INDEX `productos_fk_20_idx` (`inventory_id` ASC) ;





CREATE TABLE `users`(
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(50) NOT NULL,
`last_name` VARCHAR(100) NOT NULL,
`email` VARCHAR(150) NOT NULL,
`password` VARCHAR(300) NOT NULL,
`role_id` INT NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE `roles`(
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(30) NOT NULL,
PRIMARY KEY (`id`)
);

ALTER TABLE `azport2`.`users` 
ADD INDEX `rolId_idx` (`role_id` ASC);
;
ALTER TABLE `azport2`.`users` 
ADD CONSTRAINT `role_id`
  FOREIGN KEY (`role_id`)
  REFERENCES `azport2`.`roles` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
INSERT INTO roles VALUES 
(DEFAULT, "Administrador");

INSERT INTO roles VALUES
(DEFAULT, "Usuario");

INSERT INTO categories VALUES
(DEFAULT, "Mujer");

INSERT INTO categories VALUES
(DEFAULT, "Hombre");

INSERT INTO categories VALUES
(DEFAULT, "Accesorio");