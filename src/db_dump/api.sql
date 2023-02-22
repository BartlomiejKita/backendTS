-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: library_app
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Mickiewicz','2023-02-20 10:55:34'),(2,'Sienkiewicz','2023-02-20 10:55:43'),(3,'Sapkowski','2023-02-20 10:55:52'),(5,'Lesmian','2023-02-20 15:18:25'),(6,'Christie','2023-02-20 15:24:44'),(7,'Tolkien','2023-02-20 15:48:13'),(8,'Anonim','2023-02-20 15:58:44'),(9,'new author','2023-02-21 08:30:57');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors_books`
--

DROP TABLE IF EXISTS `authors_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors_books` (
  `author_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`author_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `authors_books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `authors_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors_books`
--

LOCK TABLES `authors_books` WRITE;
/*!40000 ALTER TABLE `authors_books` DISABLE KEYS */;
INSERT INTO `authors_books` VALUES (1,1),(2,1),(3,1),(5,1),(6,1),(7,1),(8,1),(9,1),(1,2),(2,2),(3,2),(5,2),(6,2),(7,2),(8,2),(1,3),(2,3),(5,3),(6,3),(7,3),(8,3),(1,4),(2,4),(3,4),(5,4),(6,4),(7,4),(8,4),(1,5),(2,5),(3,5),(5,5),(6,5),(7,5),(8,5);
/*!40000 ALTER TABLE `authors_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `book_title` varchar(300) NOT NULL,
  `pages` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'W pustyni i w puszczy',356,'2023-02-20 10:55:58'),(2,'Wiedzmin',403,'2023-02-20 10:56:09'),(3,'Wiedzmin 2',567,'2023-02-20 10:56:20'),(4,'Wiedzmin 3',678,'2023-02-20 10:56:28'),(5,'Dziady',267,'2023-02-20 10:56:39');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-22 10:46:45
