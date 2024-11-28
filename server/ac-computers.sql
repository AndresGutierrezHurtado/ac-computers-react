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
    `user_password` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`user_id`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `role_id`, `user_password`) VALUES
('7dd55767-9222-47c9-a079-4a179cf3c3a0', 'Amalia', 'Castro Ardila', 'amaliacastro78@gmail.com', 3118835868, 1, '$2b$10$0IpB6LdgICHLL1n9bRNpT.J9jYfWcpBIHYN.NnN4VhMn9.hLYohwS'),
('e479bc7a-10c8-471c-8193-59454b75d0e0', 'Andrés', 'Gutiérrez Hurtado', 'andres52885241@gmail.com', 3209202177, 1, '$2b$10$RUBCVdhvvFXb6khHZO2AMu8UAM6hsvgW3wqGT3A8un7vlAkAOrT1a');

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de categorias
CREATE TABLE `categories` (
    `category_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `category_name` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, "computador"),
(2, "componente");

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de productos
CREATE TABLE `products` (
    `product_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `product_name` VARCHAR(100) NOT NULL,
    `product_description` VARCHAR(100) NOT NULL,
    `product_image_url` VARCHAR(255) NOT NULL DEFAULT "/images/products/default.jpg",
    `product_price` DECIMAL(10, 0) NOT NULL,
    `category_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_image_url`, `product_price`, `category_id`) VALUES
('0928d6da-7443-43e5-bc66-ce7ddb7cbe43', 'PC Streamer Edition', 'PC diseñada para streaming y multitarea', '/images/products/default.jpg', 4800000, 1),
('10cb4e1b-03bb-4e73-b86f-d5422be1f5ee', 'PC Warzone', 'PC para desarrollo y videojuegos', '/images/products/default.jpg', 5500000, 1),
('32769f78-b0bc-49eb-b507-8c081437eef1', 'PC Creator Pro', 'PC optimizada para edición de video y diseño gráfico', '/images/products/default.jpg', 6200000, 1),
('fc7adfe3-d907-4bd6-a8fd-c711261cf4e8', 'PC Budget Gaming', 'PC económica para juegos en 1080p', '/images/products/default.jpg', 3200000, 1);

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de especificaciones de los productos
CREATE TABLE `specs` (
    `spec_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `spec_key` VARCHAR(20) NOT NULL,
    `spec_value` VARCHAR(50) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `specs` (`spec_id`, `spec_key`, `spec_value`, `product_id`) VALUES
('14497a7b-2de4-454d-8da1-cb5969c971ce', 'Procesador', 'Ryzen 7 7700X', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('2320085c-6f89-47d0-8c59-b0c7f3be515f', 'Placa Madre', 'X570 TOMAHAWK', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('2ba890a0-474d-4568-8d32-3cb4dc2b8775', 'RAM', '32G DDR4 3600MHZ', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('2c78dc7c-d03e-4f84-a295-f1c556d55dea', 'Procesador', 'Intel Core i9-12900K', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('2e580c95-ecaf-46df-9f75-075d9baa4248', 'Procesador', 'Intel Core i5-12600K', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('32beb429-b33b-4a4b-b4cb-009a2ad67f92', 'Tarjeta Gráfica', 'RTX 4070 Ti 12GB', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('33bff5fd-d596-4d72-b95a-8089fdd690a8', 'Fuente de Poder', '850W 80+ GOLD', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('34142439-771a-4175-b791-725aefca6b8a', 'Chasis', 'Deepcool Matrexx 55', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('442c982c-33ad-454b-b515-3021864a7dc0', 'Chasis', 'Fan Y7 RGB', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('452a8433-dcda-438f-8073-e68f301bcbe8', 'Placa Madre', 'Z690 AORUS PRO', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('4daf6f96-cf8d-4659-a046-1f9a23cfbb66', 'Chasis', 'Corsair iCUE 4000X', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('7249c1e9-4560-42de-80a8-a44fa484c0c9', 'Chasis', 'NZXT H510', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('9ee9f94d-3d46-4ed7-b20f-5190b75bf52d', 'Fuente de Poder', '750W 80+ GOLD', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('a4a9bc6c-5eee-421b-aff9-523f4b313955', 'Placa Madre', 'B560M', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('a8a838be-64aa-4249-895a-68de9b6b9767', 'Tarjeta Gráfica', 'RTX 4080 16GB', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('a8ba3394-d203-4668-8914-dfc357b01381', 'Almacenamiento', 'SSD 2TB M.2', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('ae7dcefe-3676-430d-8c10-1925d90ca5f8', 'Fuente de Poder', '650W 80+ BRONCE', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('b4a22ab2-a56b-47a7-a47a-52a6abb6926a', 'Almacenamiento', 'SSD 1TB M.2', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('b921e7dc-c858-4aa0-9bf0-ec12b0d1a119', 'RAM', '64G DDR5 6000MHZ', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('bae6b380-61e3-4841-a12d-f93692ea1f39', 'Tarjeta Gráfica', 'RTX 3060 12GB', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('c28ecaae-d368-4441-b999-feae35fa3775', 'Placa Madre', 'B650M', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('c4019753-603a-4ce6-888b-0d1f406769ca', 'Almacenamiento', 'SSD 1TB NVMe + HDD 4TB', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('c4e3762e-dd86-437f-bf04-1157cc22d954', 'RAM', '64G DDR5 5600MHZ', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('d9a68320-308f-4fb6-8a88-a104bf045da1', 'Tarjeta Gráfica', 'RTX 4060 8GB', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('e2c44632-3e27-4059-89ce-950ce28e756c', 'RAM', '16G DDR4 3200MHZ', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('e410697f-6426-465f-917b-e2c62f8991ae', 'Fuente de Poder', '600W 80+ BRONCE', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('ef0738be-f245-40d7-a9da-7d33b799951f', 'Almacenamiento', 'SSD 1TB M.2 + SSD 2TB SATA', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('f69ed880-e444-4936-8477-3285d92dec2f', 'Procesador', 'Ryzen 9 5950X', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43');

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
