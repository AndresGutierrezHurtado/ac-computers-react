DROP DATABASE IF EXISTS `ac-computers-db`;
CREATE DATABASE `ac-computers-db`;
USE `ac-computers-db`;

DROP TABLE IF EXISTS `products`, `users`, `sessions`, `recovery`;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de sesiones
CREATE TABLE `sessions` (
    `sid` VARCHAR(60) NOT NULL PRIMARY KEY,
    `expires` DATETIME DEFAULT NULL,
    `data` TEXT DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de recuperacion de cuentas
CREATE TABLE `recoveries` (
    `recovery_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `recovery_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `recovery_expiration` TIMESTAMP NOT NULL DEFAULT DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de roles
CREATE TABLE `roles` (
    `role_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `role_name` VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, "usuario"),
(2, "administrador");

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de usuarios
CREATE TABLE `users` (
    `user_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_name` VARCHAR(50) NOT NULL,
    `user_lastname` VARCHAR(60) NOT NULL,
    `user_email` VARCHAR(80) NOT NULL,
    `user_phone` DECIMAL(10, 0) NOT NULL,
    `role_id` INT NOT NULL DEFAULT 1,
    `password` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de categorias
CREATE TABLE `categories` (
    `category_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `category_name` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, "producto"),
(2, "componente");

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de productos
CREATE TABLE `products` (
    `product_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `product_name` VARCHAR(100) NOT NULL,
    `product_description` VARCHAR(100) NOT NULL,
    `product_price` DECIMAL(10, 0) NOT NULL,
    `category_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de especificaciones de los productos
CREATE TABLE `specs` (
    `spec_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `spec_key` VARCHAR(20) NOT NULL,
    `spec_value` VARCHAR(50) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de los archivos multimedia
CREATE TABLE `multimedias` (
    `media_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `media_url` VARCHAR(255) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `recoveries`
ADD CONSTRAINT `fk_recoveries_users`
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `users`
ADD CONSTRAINT `fk_users_roles`
FOREIGN KEY (`role_id`)
REFERENCES `roles` (`role_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `products`
ADD CONSTRAINT `fk_products_categories`
FOREIGN KEY (`category_id`)
REFERENCES `categories` (`category_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `specs`
ADD CONSTRAINT `fk_specs_products`
FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `multimedias`
ADD CONSTRAINT `fk_multimedias_products`
FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;
