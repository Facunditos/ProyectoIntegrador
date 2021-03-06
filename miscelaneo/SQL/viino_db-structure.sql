DROP DATABASE IF EXISTS viino_db;
CREATE DATABASE viino_db; 
USE viino_db;

--
-- Estructura de la tabla `producers`
--

/*DROP TABLE IF EXISTS `producers`;*/
CREATE TABLE `producers` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Estructura de la tabla `types`
--

/*DROP TABLE IF EXISTS `types`;*/
CREATE TABLE `types` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Estructura de la tabla `varietals`
--

/*DROP TABLE IF EXISTS `varietals`;*/
CREATE TABLE `varietals` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Estructura de la tabla `winemakers`
--

/*DROP TABLE IF EXISTS `winemakers`;*/
CREATE TABLE `winemakers` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Estructura de la tabla `users`
--

/*DROP TABLE IF EXISTS `users`;*/
CREATE TABLE `users` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` varchar(15) NOT NULL,
  `image` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_un` (`id`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Estructura de la tabla `products`
--

/*DROP TABLE IF EXISTS `products`;*/
CREATE TABLE `products` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `short_name` varchar(50) NOT NULL,
  `producer_id` int(6) NOT NULL,
  `year` int(4) NOT NULL,
  `type_id` int(6) NOT NULL,
  `price` int(6) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `altitude` int(4) NOT NULL,
  `soil` varchar(100) NOT NULL,
  `abv` decimal(3,1) NOT NULL,
  `breeding` text NOT NULL,
  `varietal_id` int(6) NOT NULL,
  `varietal_comp` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`producer_id`),
  KEY `products_FK_1` (`type_id`),
  KEY `products_FK_2` (`varietal_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`producer_id`) REFERENCES `producers` (`id`),
  CONSTRAINT `products_FK_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`),
  CONSTRAINT `products_FK_2` FOREIGN KEY (`varietal_id`) REFERENCES `varietals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Estructura de la tabla `image` - para tener mas de una imagen por producto (alguna vez!)
--

/*DROP TABLE IF EXISTS `images`;*/
CREATE TABLE `images` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(100) NOT NULL,
  `product_id` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `images_FK`(`product_id`),
  CONSTRAINT `images_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Estructura de la tabla `winemaker_product`
--

/*DROP TABLE IF EXISTS `winemaker_product`;*/
CREATE TABLE `winemaker_product` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `winemaker_id` int(6) NOT NULL,
  `product_id` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `winemaker_product_FK` (`product_id`),
  KEY `winemaker_product_FK_1` (`winemaker_id`),
  CONSTRAINT `winemaker_product_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `winemaker_product_FK_1` FOREIGN KEY (`winemaker_id`) REFERENCES `winemakers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Estructura de la tabla `carts`
--

/*DROP TABLE IF EXISTS `carts`;*/
CREATE TABLE `carts` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `user_id` int(6) NOT NULL,
  `product_id` int(6) NOT NULL,
  `item_qtty` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_FK` (`user_id`),
  KEY `cart_FK_1` (`product_id`),
  CONSTRAINT `cart_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




--
-- Estructura de la tabla `product_user` para implementar favoritos (alguna vez!)
--

/*DROP TABLE IF EXISTS `product_user`;*/
CREATE TABLE `product_user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `user_id` int(6) NOT NULL,
  `product_id` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_user_FK_1` (`product_id`),
  KEY `product_user_FK` (`user_id`),
  CONSTRAINT `product_user_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_user_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



