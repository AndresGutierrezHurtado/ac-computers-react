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
    `product_discount` INT NOT NULL DEFAULT 0,
    `product_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `category_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_image_url`, `product_price`, `product_discount`, `product_date`, `category_id`) VALUES
-- Computers
('0928d6da-7443-43e5-bc66-ce7ddb7cbe43', 'PC Streamer Edition', 'PC diseñada para streaming y multitarea', '/images/products/default.jpg', 4800000, 10, '2024-06-15 00:00:00', 1),
('10cb4e1b-03bb-4e73-b86f-d5422be1f5ee', 'PC Warzone', 'PC para desarrollo y videojuegos', '/images/products/default.jpg', 5500000, 0, '2024-07-20 00:00:00', 1),
('32769f78-b0bc-49eb-b507-8c081437eef1', 'PC Creator Pro', 'PC optimizada para edición de video y diseño gráfico', '/images/products/default.jpg', 6200000, 12, '2024-08-05 00:00:00', 1),
('3f66861c-27f6-49b8-89ff-a923a6377229', 'Workstation Creator Pro', 'Estación de trabajo para edición de video y diseño 3D.', '/images/products/default.jpg', 7500000, 5, '2024-09-12 00:00:00', 1),
('456887fd-9955-45ff-9399-121e81600842', 'PC Oficina Smart', 'PC eficiente para tareas de oficina y productividad.', '/images/products/default.jpg', 2000000, 0, '2024-06-30 00:00:00', 1),
('63f5737c-4d00-4689-a054-f1b4265eaadf', 'PC Diseño Gráfico Visionary', 'Computador especializado para diseñadores y editores.', '/images/products/default.jpg', 6200000, 0, '2024-11-02 00:00:00', 1),
('a6709bce-e0fe-4326-b83a-5ab75a1698fe', 'PC Gamer NitroX', 'PC gamer de alto rendimiento con componentes de última generación.', '/images/products/default.jpg', 4500000, 0, '2024-12-10 00:00:00', 1),
('dee80ac7-201d-4645-bd9f-c1ba43d3d143', 'Servidor NAS Pro', 'Servidor de almacenamiento para entornos empresariales.', '/images/products/default.jpg', 6800000, 10, '2024-08-25 00:00:00', 1),
('fc7adfe3-d907-4bd6-a8fd-c711261cf4e8', 'PC Budget Gaming', 'PC económica para juegos en 1080p', '/images/products/default.jpg', 3200000, 0, '2024-09-09 00:00:00', 1),
('fdb62e9e-eb77-457d-ac80-e79871c6b6c6', 'PC Gamer Alpha', 'PC gamer con enfriamiento líquido y rendimiento extremo.', '/images/products/default.jpg', 5500000, 7, '2024-10-18 00:00:00', 1),

-- Components
('14e89a1f-7158-4715-b4b9-5e5171f98da9', 'Caja ATX NZXT H510', 'Chasis compacto y minimalista para PC.', '/images/products/default.jpg', 500000, 0, '2024-07-03 00:00:00', 2),
('2295b1cb-fa65-4086-a00e-49358c0d5013', 'Disco Duro SSD Samsung 970 EVO Plus 1TB', 'Disco SSD NVMe para almacenamiento rápido.', '/images/products/default.jpg', 750000, 0, '2024-07-17 00:00:00', 2),
('50890f7f-ed2b-4ba2-b77c-83f0b4d40f02', 'Memoria RAM Corsair Vengeance 16GB', 'Memoria RAM DDR4 de 16GB para alto rendimiento.', '/images/products/default.jpg', 400000, 0, '2024-10-05 00:00:00', 2),
('8930d24c-1c6a-4c6f-8b37-cbd5a9513e7a', 'Tarjeta gráfica NVIDIA RTX 3060', 'Tarjeta gráfica con 12GB GDDR6, ideal para gaming y diseño.', '/images/products/default.jpg', 2100000, 0, '2024-11-22 00:00:00', 2),
('8c67d0b6-48ce-4e37-8b1d-fbc01f58d944', 'Procesador Intel Core i7 12700K', 'Procesador de 12 núcleos, ideal para alto rendimiento.', '/images/products/default.jpg', 1800000, 0, '2024-12-01 00:00:00', 2),
('9ee4191b-62c1-486a-901a-9fe5318ede73', 'Tarjeta de sonido Creative Sound BlasterX', 'Tarjeta de sonido para audio de alta fidelidad.', '/images/products/default.jpg', 350000, 0, '2024-08-11 00:00:00', 2),
('a754dd9d-b11d-40c6-bded-a22b9fece258', 'Monitor Gaming LG Ultragear 27\'\'', 'Monitor IPS con resolución QHD y 144Hz.', '/images/products/default.jpg', 1300000, 0, '2024-09-27 00:00:00', 2),
('a942bb25-3c28-4961-88dd-4bab9540aa7f', 'Placa Madre ASUS ROG STRIX Z690', 'Placa madre compatible con Intel de 12ª generación.', '/images/products/default.jpg', 1500000, 0, '2024-10-13 00:00:00', 2),
('beb98e2c-0357-410c-b9e5-f67948851ded', 'Refrigeración Líquida Corsair H100i', 'Sistema de enfriamiento líquido para CPU.', '/images/products/default.jpg', 800000, 0, '2024-06-21 00:00:00', 2),
('cc1a44d9-3e9e-4ea7-a2f8-bdfa84c0433f', 'Fuente de poder Corsair 750W', 'Fuente de poder modular de 750W, certificación 80 Plus Gold.', '/images/products/default.jpg', 600000, 0, '2024-12-15 00:00:00', 2);

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
('0128b5ee-7e23-4f17-bb32-c6dc5601790e', 'Capacidad', '16GB', '50890f7f-ed2b-4ba2-b77c-83f0b4d40f02'),
('04cafc73-13db-4bed-9d46-2ca1f67ec31f', 'Interfaz', 'PCIe', '9ee4191b-62c1-486a-901a-9fe5318ede73'),
('0e28a1ff-83b8-42a7-8109-77c03b237960', 'Disipador', 'Corsair H100i RGB', 'fdb62e9e-eb77-457d-ac80-e79871c6b6c6'),
('1093ff7e-b2c1-4d67-95b8-f8c23dd60aaa', 'Memoria', '12GB GDDR6', '8930d24c-1c6a-4c6f-8b37-cbd5a9513e7a'),
('1158bbca-0ce4-4bd6-9f70-9bb22d8d9cc5', 'Chasis', 'NZXT H510', 'a6709bce-e0fe-4326-b83a-5ab75a1698fe'),
('14497a7b-2de4-454d-8da1-cb5969c971ce', 'Procesador', 'Ryzen 7 7700X', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('176be031-819b-43b7-ae61-30e31f5e9840', 'Disipador', 'Noctua NH-U9DX', 'dee80ac7-201d-4645-bd9f-c1ba43d3d143'),
('19bf050b-7bcb-4a31-9203-ded899f049bd', 'RAM', '32GB DDR4 3600MHz', '3f66861c-27f6-49b8-89ff-a923a6377229'),
('19e25778-6268-43db-8f35-1ad0ba9848c4', 'Fuente de poder', 'Seasonic 750W 80 Plus Gold', '63f5737c-4d00-4689-a054-f1b4265eaadf'),
('1a9fc948-8013-4132-b3a8-141728fe8e43', 'Tarjeta gráfica', 'NVIDIA RTX 3080 10GB', '3f66861c-27f6-49b8-89ff-a923a6377229'),
('1d2a468c-32cd-4d1d-abc9-f33c6913d6e2', 'Disipador', 'NZXT Kraken Z63', '3f66861c-27f6-49b8-89ff-a923a6377229'),
('1d88c80c-3990-4af3-9c9a-abbf86bcc8d4', 'Tarjeta gráfica', 'NVIDIA Quadro P2200 5GB', '63f5737c-4d00-4689-a054-f1b4265eaadf'),
('22b4f199-ec37-4a99-9df5-e283db3cbc75', 'Tarjeta gráfica', 'NVIDIA RTX 3060 12GB', 'a6709bce-e0fe-4326-b83a-5ab75a1698fe'),
('2320085c-6f89-47d0-8c59-b0c7f3be515f', 'Placa Madre', 'X570 TOMAHAWK', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('238d44c7-17e6-4d1f-a5a9-12274189e1ee', 'RAM', '16GB DDR4 3200MHz', 'a6709bce-e0fe-4326-b83a-5ab75a1698fe'),
('263c59fb-a51b-4b19-9d6a-11f7917a4964', 'Tarjeta gráfica', 'Integrada Intel UHD 630', '456887fd-9955-45ff-9399-121e81600842'),
('2ba890a0-474d-4568-8d32-3cb4dc2b8775', 'RAM', '32G DDR4 3600MHZ', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('2c78dc7c-d03e-4f84-a295-f1c556d55dea', 'Procesador', 'Intel Core i9-12900K', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('2e580c95-ecaf-46df-9f75-075d9baa4248', 'Procesador', 'Intel Core i5-12600K', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('32beb429-b33b-4a4b-b4cb-009a2ad67f92', 'Tarjeta Gráfica', 'RTX 4070 Ti 12GB', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('33bff5fd-d596-4d72-b95a-8089fdd690a8', 'Fuente de Poder', '850W 80+ GOLD', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('34142439-771a-4175-b791-725aefca6b8a', 'Chasis', 'Deepcool Matrexx 55', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('36e89e77-30a1-451c-b1f6-b494753af43a', 'Potencia', '750W', 'cc1a44d9-3e9e-4ea7-a2f8-bdfa84c0433f'),
('3ca394ca-ba39-4306-9675-a396124f1ddf', 'Procesador', 'Intel Core i5 12600K', 'a6709bce-e0fe-4326-b83a-5ab75a1698fe'),
('3d03d97e-d7e7-490a-8cd5-23e89efe15c4', 'Procesador', 'AMD Ryzen 7 5800X', '63f5737c-4d00-4689-a054-f1b4265eaadf'),
('3d216e5c-c86b-4134-90fa-6e3837e1e0d2', 'Procesador', 'Intel Core i3 10100', '456887fd-9955-45ff-9399-121e81600842'),
('3edc10a5-1c16-410d-8263-fde9484da45f', 'Frecuencia', '1.78 GHz', '8930d24c-1c6a-4c6f-8b37-cbd5a9513e7a'),
('40c18f9c-f154-466d-b09b-20c4be109640', 'Certificación', '80 Plus Gold', 'cc1a44d9-3e9e-4ea7-a2f8-bdfa84c0433f'),
('442c982c-33ad-454b-b515-3021864a7dc0', 'Chasis', 'Fan Y7 RGB', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('452a8433-dcda-438f-8073-e68f301bcbe8', 'Placa Madre', 'Z690 AORUS PRO', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('4bbc5893-7b0e-48b7-8a6a-cecf4fd7d04f', 'Fuente de poder', '1000W redundante', 'dee80ac7-201d-4645-bd9f-c1ba43d3d143'),
('4daf6f96-cf8d-4659-a046-1f9a23cfbb66', 'Chasis', 'Corsair iCUE 4000X', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('51c9a5e0-92b5-40f1-adb6-f0e3dbf5d75a', 'Disipador', 'Noctua NH-D15', '63f5737c-4d00-4689-a054-f1b4265eaadf'),
('51e8a88a-83c6-4fdc-80c5-3e597f6eab2b', 'Fuente de poder', 'EVGA 850W 80 Plus Platinum', '3f66861c-27f6-49b8-89ff-a923a6377229'),
('5669e1e9-f6bf-49ec-b918-a6ccab5cb8ad', 'Núcleos', '12', '8c67d0b6-48ce-4e37-8b1d-fbc01f58d944'),
('5b8ecb88-471d-4e67-8a3e-3ba970fe17b7', 'Tarjeta gráfica', 'N/A', 'dee80ac7-201d-4645-bd9f-c1ba43d3d143'),
('5d8d2e2f-7bca-4bdd-95bd-183f60a368f2', 'Disipador', 'Cooler Master Hyper 212', 'a6709bce-e0fe-4326-b83a-5ab75a1698fe'),
('607c5b10-c434-4596-875d-264b526bfaf5', 'RAM', '8GB DDR4 2666MHz', '456887fd-9955-45ff-9399-121e81600842'),
('6ab915e9-d55a-41cb-a900-80ea7a15f26f', 'Tamaño', '27 pulgadas', 'a754dd9d-b11d-40c6-bded-a22b9fece258'),
('6be195bc-bf7e-4c8e-ab00-607252a8f549', 'Chasis', 'Fractal Design Meshify C', '63f5737c-4d00-4689-a054-f1b4265eaadf'),
('7249c1e9-4560-42de-80a8-a44fa484c0c9', 'Chasis', 'NZXT H510', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('72beeeec-deb7-4aea-9370-3390afd049b9', 'Chasis', 'Cooler Master MasterBox TD500', 'fdb62e9e-eb77-457d-ac80-e79871c6b6c6'),
('79f4abb0-89e2-4e8f-94c2-3392ca894aa3', 'Capacidad', '1TB', '2295b1cb-fa65-4086-a00e-49358c0d5013'),
('7a176d5c-e077-43fb-a127-540777418fb5', 'Velocidad', '3200 MHz', '50890f7f-ed2b-4ba2-b77c-83f0b4d40f02'),
('7a64b541-e4ac-4923-8237-98818b0b6a93', 'Chasis', 'Antec NX200', '456887fd-9955-45ff-9399-121e81600842'),
('7b4dd53c-f8da-471b-b150-190be7aab27b', 'Fuente de poder', 'Corsair 750W 80 Plus Gold', 'a6709bce-e0fe-4326-b83a-5ab75a1698fe'),
('7cbe2da5-bda3-4806-9878-a39f8eacbb8d', 'Procesador', 'Intel Xeon E-2276G', 'dee80ac7-201d-4645-bd9f-c1ba43d3d143'),
('891d9817-b515-4b05-bc9f-5fe1ef5a5dfe', 'Tipo', 'Líquida', 'beb98e2c-0357-410c-b9e5-f67948851ded'),
('898c79e8-0cc3-458d-8943-e1b24d1a0323', 'Frecuencia base', '3.6 GHz', '8c67d0b6-48ce-4e37-8b1d-fbc01f58d944'),
('8b98ca6a-f548-4b97-b98f-50215918d33c', 'Fuente de poder', 'Corsair RM750X 750W', 'fdb62e9e-eb77-457d-ac80-e79871c6b6c6'),
('8d56cc4b-ba00-48e6-9529-3969f0d1ce5c', 'Canales', '7.1', '9ee4191b-62c1-486a-901a-9fe5318ede73'),
('9670c70b-d9a4-4242-b204-6dd98573f277', 'Chasis', 'Corsair 4000D', '3f66861c-27f6-49b8-89ff-a923a6377229'),
('9b110860-d288-4744-b068-a12e83a72ad7', 'Disipador', 'Stock Intel', '456887fd-9955-45ff-9399-121e81600842'),
('9ee9f94d-3d46-4ed7-b20f-5190b75bf52d', 'Fuente de Poder', '750W 80+ GOLD', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('a4a9bc6c-5eee-421b-aff9-523f4b313955', 'Placa Madre', 'B560M', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('a8a838be-64aa-4249-895a-68de9b6b9767', 'Tarjeta Gráfica', 'RTX 4080 16GB', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('a8ba3394-d203-4668-8914-dfc357b01381', 'Almacenamiento', 'SSD 2TB M.2', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('abe96d77-e225-4a1e-8389-d43089c36698', 'Color', 'Blanco', '14e89a1f-7158-4715-b4b9-5e5171f98da9'),
('ae7dcefe-3676-430d-8c10-1925d90ca5f8', 'Fuente de Poder', '650W 80+ BRONCE', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('b1a88a8a-f4b7-4bea-a7ce-1e97038d93a3', 'RAM', '32GB DDR4 3200MHz', '63f5737c-4d00-4689-a054-f1b4265eaadf'),
('b4a22ab2-a56b-47a7-a47a-52a6abb6926a', 'Almacenamiento', 'SSD 1TB M.2', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('b921e7dc-c858-4aa0-9bf0-ec12b0d1a119', 'RAM', '64G DDR5 6000MHZ', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('bae6b380-61e3-4841-a12d-f93692ea1f39', 'Tarjeta Gráfica', 'RTX 3060 12GB', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('c07d6818-5753-4e8b-a370-6a3ef3aa4f0c', 'Frecuencia', '144Hz', 'a754dd9d-b11d-40c6-bded-a22b9fece258'),
('c28ecaae-d368-4441-b999-feae35fa3775', 'Placa Madre', 'B650M', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('c4019753-603a-4ce6-888b-0d1f406769ca', 'Almacenamiento', 'SSD 1TB NVMe + HDD 4TB', '32769f78-b0bc-49eb-b507-8c081437eef1'),
('c4e3762e-dd86-437f-bf04-1157cc22d954', 'RAM', '64G DDR5 5600MHZ', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('c89beb18-98f4-47bc-a8cc-b2a6cc069141', 'Fuente de poder', '500W certificada', '456887fd-9955-45ff-9399-121e81600842'),
('d1220321-b389-47b1-a5e4-2119f07e0fd6', 'Tarjeta gráfica', 'NVIDIA RTX 3070 8GB', 'fdb62e9e-eb77-457d-ac80-e79871c6b6c6'),
('d485ee8f-74d1-4f69-9d94-0ad552478293', 'Tamaño radiador', '240mm', 'beb98e2c-0357-410c-b9e5-f67948851ded'),
('d6a2523e-7111-4f07-a22d-93f69df812a9', 'Formato', 'ATX', '14e89a1f-7158-4715-b4b9-5e5171f98da9'),
('d9a68320-308f-4fb6-8a88-a104bf045da1', 'Tarjeta Gráfica', 'RTX 4060 8GB', '10cb4e1b-03bb-4e73-b86f-d5422be1f5ee'),
('d9f7df6f-d742-421e-828d-e48b3e4a182e', 'Chasis', 'Rack 4U', 'dee80ac7-201d-4645-bd9f-c1ba43d3d143'),
('e2c44632-3e27-4059-89ce-950ce28e756c', 'RAM', '16G DDR4 3200MHZ', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('e410697f-6426-465f-917b-e2c62f8991ae', 'Fuente de Poder', '600W 80+ BRONCE', 'fc7adfe3-d907-4bd6-a8fd-c711261cf4e8'),
('e69ef64e-7929-4d75-ae6d-88eefaf4fb4b', 'Formato', 'ATX', 'a942bb25-3c28-4961-88dd-4bab9540aa7f'),
('ebac53be-b39e-4674-bd9d-3806f0661deb', 'RAM', '16GB DDR4 3600MHz', 'fdb62e9e-eb77-457d-ac80-e79871c6b6c6'),
('ecfe6d86-9307-401c-803e-61cfe3dbc53b', 'Procesador', 'AMD Ryzen 9 5950X', '3f66861c-27f6-49b8-89ff-a923a6377229'),
('eed8b6ad-440b-4d4f-8f2f-adb4bf421309', 'RAM', '32GB ECC DDR4', 'dee80ac7-201d-4645-bd9f-c1ba43d3d143'),
('ef0738be-f245-40d7-a9da-7d33b799951f', 'Almacenamiento', 'SSD 1TB M.2 + SSD 2TB SATA', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('f0c7dee8-ff83-4a42-b333-b1a2f832afb7', 'Interfaz', 'NVMe M.2', '2295b1cb-fa65-4086-a00e-49358c0d5013'),
('f30ee2d1-6bf5-48e4-ad11-960c34f28af8', 'Procesador', 'Intel Core i7 12700KF', 'fdb62e9e-eb77-457d-ac80-e79871c6b6c6'),
('f69ed880-e444-4936-8477-3285d92dec2f', 'Procesador', 'Ryzen 9 5950X', '0928d6da-7443-43e5-bc66-ce7ddb7cbe43'),
('fe632469-e918-48ea-b32e-caf7842107fa', 'Socket', 'LGA 1700', 'a942bb25-3c28-4961-88dd-4bab9540aa7f');

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
