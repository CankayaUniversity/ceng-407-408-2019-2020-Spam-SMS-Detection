-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: spam_sms_detection
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(256) NOT NULL,
  `text` longtext NOT NULL,
  `sender` varchar(256) NOT NULL,
  `isSpam` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1446 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1436,'egedikoglu1@gmail.com','Are you unique enough? Find out from 30th August. www.areyouunique.co.uk','+905444277980',NULL),(1437,'egedikoglu1@gmail.com','I plane to give on this month end.','+905444277980',NULL),(1438,'egedikoglu1@gmail.com','Tell where you reached','+905444277980',NULL),(1439,'egedikoglu1@gmail.com','SMS. ac Sptv: The New Jersey Devils and the Detroid Red Wings play Ice Hockey. Correct or Incorrect? End? Reply END SPTV','+905444277980',NULL),(1440,'egedikoglu1@gmail.com','Is that seriously how you spell his name?','+905444277980',NULL),(1441,'m@m.com','Are you unique enough? Find out from 30th August. www.areyouunique.co.uk','+905444277980',NULL),(1442,'m@m.com','I plane to give on this month end.','+905444277980',NULL),(1443,'m@m.com','Tell where you reached','+905444277980',NULL),(1444,'m@m.com','SMS. ac Sptv: The New Jersey Devils and the Detroid Red Wings play Ice Hockey. Correct or Incorrect? End? Reply END SPTV','+905444277980',NULL),(1445,'m@m.com','Is that seriously how you spell his name?','+905444277980',NULL);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `avatar` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (22,'egedikoglu1@gmail.com','$2b$12$fUoZ1JZV6mxS61k5pLrXXurd3ynrrhCMOkzRVjUaquk5h04G0Pa9G','05444277980','https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'),(24,'m@m.com','$2b$12$lvcX1aHt3Drg6FpJUzjFOuGlArgJS5xSmWls6oHeB39nhYWEzQzEW','05445554455','https://iupac.org/wp-content/uploads/2018/05/default-avatar.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-02 13:25:26
