-- MySQL dump 10.13  Distrib 8.0.42, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: fanscore_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `HaliSaha`
--

DROP TABLE IF EXISTS `HaliSaha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HaliSaha` (
  `HaliSahaID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Description` text,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `City` varchar(80) NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`HaliSahaID`),
  KEY `idx_halisaha_user` (`UserID`),
  CONSTRAINT `fk_halisaha_user` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HaliSaha`
--

LOCK TABLES `HaliSaha` WRITE;
/*!40000 ALTER TABLE `HaliSaha` DISABLE KEYS */;
/*!40000 ALTER TABLE `HaliSaha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pics`
--

DROP TABLE IF EXISTS `Pics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pics` (
  `PicID` int NOT NULL AUTO_INCREMENT,
  `ProductID` int NOT NULL,
  `PicUrl` varchar(512) NOT NULL,
  PRIMARY KEY (`PicID`),
  KEY `idx_pics_product` (`ProductID`),
  CONSTRAINT `fk_pics_product` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pics`
--

LOCK TABLES `Pics` WRITE;
/*!40000 ALTER TABLE `Pics` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Player`
--

DROP TABLE IF EXISTS `Player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Player` (
  `PlayerID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `TeamID` int DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Position` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PlayerID`),
  KEY `idx_player_team` (`TeamID`),
  CONSTRAINT `fk_player_team` FOREIGN KEY (`TeamID`) REFERENCES `Team` (`TeamID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Player`
--

LOCK TABLES `Player` WRITE;
/*!40000 ALTER TABLE `Player` DISABLE KEYS */;
/*!40000 ALTER TABLE `Player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) NOT NULL,
  `ListedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UserID` int NOT NULL,
  `PicID` int DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `idx_product_user` (`UserID`),
  KEY `idx_product_pic` (`PicID`),
  CONSTRAINT `fk_product_pic` FOREIGN KEY (`PicID`) REFERENCES `Pics` (`PicID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_product_user` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `RatingID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `PlayerID` int NOT NULL,
  `RatingValue` decimal(3,1) NOT NULL,
  `Comment` varchar(500) DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PeriodType` varchar(20) NOT NULL,
  `BucketStart` date NOT NULL,
  PRIMARY KEY (`RatingID`),
  UNIQUE KEY `uq_rating_once` (`UserID`,`PlayerID`,`PeriodType`,`BucketStart`),
  KEY `idx_rating_user` (`UserID`),
  KEY `idx_rating_player` (`PlayerID`),
  KEY `idx_rating_bucket` (`PlayerID`,`PeriodType`,`BucketStart`),
  CONSTRAINT `fk_rating_player` FOREIGN KEY (`PlayerID`) REFERENCES `Player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rating_user` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Team` (
  `TeamID` int NOT NULL AUTO_INCREMENT,
  `TeamName` varchar(100) NOT NULL,
  PRIMARY KEY (`TeamID`),
  UNIQUE KEY `uq_team_name` (`TeamName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
/*!40000 ALTER TABLE `Team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `RefreshToken` varchar(512) DEFAULT NULL,
  `RefreshTokenExpires` datetime DEFAULT NULL,
  `EmailVerificationToken` varchar(512) DEFAULT NULL,
  `Role` varchar(30) NOT NULL DEFAULT 'user',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `ProfilePic` varchar(512) DEFAULT NULL,
  `isBanned` tinyint(1) NOT NULL DEFAULT '0',
  `banReason` varchar(255) DEFAULT NULL,
  `newPasswordTemp` varchar(255) DEFAULT NULL,
  `PasswordResetToken` varchar(512) DEFAULT NULL,
  `PasswordResetTokenExpires` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `uq_user_username` (`UserName`),
  UNIQUE KEY `uq_user_email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01 17:21:02
