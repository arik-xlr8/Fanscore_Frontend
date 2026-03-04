-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: furkandb
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `halisaha`
--

DROP TABLE IF EXISTS `halisaha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `halisaha` (
  `HaliSahaID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Description` text,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `City` varchar(80) NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`HaliSahaID`),
  KEY `idx_halisaha_user` (`UserID`),
  CONSTRAINT `fk_halisaha_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `halisaha`
--

LOCK TABLES `halisaha` WRITE;
/*!40000 ALTER TABLE `halisaha` DISABLE KEYS */;
/*!40000 ALTER TABLE `halisaha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pics`
--

DROP TABLE IF EXISTS `pics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pics` (
  `PicID` int NOT NULL AUTO_INCREMENT,
  `ProductID` int NOT NULL,
  `PicUrl` varchar(512) NOT NULL,
  PRIMARY KEY (`PicID`),
  KEY `idx_pics_product` (`ProductID`),
  CONSTRAINT `fk_pics_product` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pics`
--

LOCK TABLES `pics` WRITE;
/*!40000 ALTER TABLE `pics` DISABLE KEYS */;
/*!40000 ALTER TABLE `pics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `PlayerID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `TeamID` int DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Position` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PlayerID`),
  UNIQUE KEY `uq_player_team_name` (`Name`,`Surname`,`TeamID`),
  KEY `idx_player_team` (`TeamID`),
  CONSTRAINT `fk_player_team` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=623 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Ederson','',1,32,'Goalkeeper'),(2,'Tarık','Çetin',1,29,'Goalkeeper'),(3,'Mert','Günok',1,37,'Goalkeeper'),(4,'Engin Can','Biterge',1,19,'Goalkeeper'),(5,'Jayden','Oosterwolde',1,24,'Centre-Back'),(6,'Milan','Škriniar',1,31,'Centre-Back'),(7,'Çağlar','Söyüncü',1,29,'Centre-Back'),(8,'Yiğit Efe','Demir',1,21,'Centre-Back'),(9,'Archie','Brown',1,23,'Left-Back'),(10,'Levent','Mercan',1,25,'Left-Back'),(11,'Nélson','Semedo',1,32,'Right-Back'),(12,'Mert','Müldür',1,26,'Right-Back'),(13,'Edson','Álvarez',1,28,'Defensive Midfield'),(14,'İsmail','Yüksek',1,27,'Defensive Midfield'),(15,'N\'Golo','Kanté',1,34,'Defensive Midfield'),(16,'Mattéo','Guendouzi',1,26,'Central Midfield'),(17,'Fred','',1,32,'Central Midfield'),(18,'Abdou Aziz','Fall',1,19,'Central Midfield'),(19,'Marco','Asensio',1,30,'Attacking Midfield'),(20,'Mert Hakan','Yandaş',1,31,'Attacking Midfield'),(21,'Kerem','Aktürkoğlu',1,27,'Left Winger'),(22,'Oğuz','Aydın',1,25,'Left Winger'),(23,'Dorgeles','Nene',1,23,'Right Winger'),(24,'Anthony','Musaba',1,25,'Right Winger'),(25,'Emre','Mor',1,28,'Right Winger'),(26,'Anderson','Talisca',1,32,'Centre-Forward'),(27,'Sidiki','Chérif',1,19,'Centre-Forward'),(32,'Uğurcan','Çakır',2,29,'Goalkeeper'),(33,'Günay','Güvenç',2,34,'Goalkeeper'),(34,'Batuhan','Şen',2,27,'Goalkeeper'),(35,'Enes Emre','Büyük',2,19,'Goalkeeper'),(36,'Wilfried','Singo',2,25,'Centre-Back'),(37,'Davinson','Sánchez',2,29,'Centre-Back'),(38,'Abdülkerim','Bardakcı',2,31,'Centre-Back'),(39,'Arda','Ünyay',2,19,'Centre-Back'),(40,'Metehan','Baltacı',2,23,'Centre-Back'),(41,'Ismail','Jakobs',2,26,'Left-Back'),(42,'Eren','Elmalı',2,25,'Left-Back'),(43,'Sacha','Boey',2,25,'Right-Back'),(44,'Roland','Sallai',2,28,'Right-Back'),(45,'Lucas','Torreira',2,30,'Defensive Midfield'),(46,'Mario','Lemina',2,32,'Defensive Midfield'),(47,'Kaan','Ayhan',2,31,'Defensive Midfield'),(48,'Gabriel','Sara',2,26,'Central Midfield'),(49,'İlkay','Gündoğan',2,35,'Central Midfield'),(50,'Renato','Nhaga',2,18,'Central Midfield'),(51,'Gökdeniz','Gürpüz',2,20,'Central Midfield'),(52,'Yunus','Akgün',2,25,'Attacking Midfield'),(53,'Noa','Lang',2,26,'Left Winger'),(54,'Barış Alper','Yılmaz',2,25,'Left Winger'),(55,'Ahmed','Kutucu',2,26,'Left Winger'),(56,'Leroy','Sané',2,30,'Right Winger'),(57,'Yáser','Asprilla',2,22,'Right Winger'),(58,'Armando','Güner',2,18,'Right Winger'),(59,'Victor','Osimhen',2,27,'Centre-Forward'),(60,'Mauro','Icardi',2,33,'Centre-Forward'),(63,'André','Onana',3,29,'Goalkeeper'),(64,'Onuralp','Çevikkan',3,20,'Goalkeeper'),(65,'Ahmet','Yıldırım',3,19,'Goalkeeper'),(66,'Erol Can','Çolak',3,20,'Goalkeeper'),(67,'Arseniy','Batagov',3,23,'Centre-Back'),(68,'Chibuike','Nwaiwu',3,22,'Centre-Back'),(69,'Stefan','Savic',3,35,'Centre-Back'),(70,'Arda','Öztürk',3,18,'Centre-Back'),(71,'Taha Emre','İnce',3,18,'Centre-Back'),(72,'Mathias','Løvik',3,22,'Left-Back'),(73,'Mustafa','Eskihellaç',3,28,'Left-Back'),(74,'Wagner','Pina',3,23,'Right-Back'),(75,'Okay','Yokuşlu',3,31,'Defensive Midfield'),(76,'Salih','Malkoçoğlu',3,21,'Defensive Midfield'),(77,'Christ Inao','Oulaï',3,19,'Central Midfield'),(78,'Benjamin','Bouchouari',3,24,'Central Midfield'),(79,'Tim','Jabol-Folcarelli',3,26,'Central Midfield'),(80,'Ozan','Tufan',3,30,'Central Midfield'),(81,'Boran','Başkan',3,19,'Central Midfield'),(82,'Ernest','Muci',3,24,'Attacking Midfield'),(83,'Anthony','Nwakaeme',3,36,'Left Winger'),(84,'Oleksandr','Zubkov',3,29,'Right Winger'),(85,'Edin','Visca',3,36,'Right Winger'),(86,'Paul','Onuachu',3,31,'Centre-Forward'),(87,'Felipe','Augusto',3,22,'Centre-Forward'),(88,'Umut','Nayir',3,32,'Centre-Forward'),(94,'Ersin','Destanoğlu',4,25,'Goalkeeper'),(95,'Devis','Vásquez',4,27,'Goalkeeper'),(96,'Emre','Bilgin',4,22,'Goalkeeper'),(97,'Emir','Yaşar',4,20,'Goalkeeper'),(98,'Emmanuel','Agbadou',4,28,'Centre-Back'),(99,'Tiago','Djaló',4,25,'Centre-Back'),(100,'Felix','Uduokhai',4,28,'Centre-Back'),(101,'Emirhan','Topçu',4,25,'Centre-Back'),(102,'Yasin','Özcan',4,19,'Left-Back'),(103,'Rıdvan','Yılmaz',4,24,'Left-Back'),(104,'Amir','Murillo',4,30,'Right-Back'),(105,'Taylan','Bulut',4,20,'Right-Back'),(106,'Gökhan','Sazdağı',4,31,'Right-Back'),(107,'Kristjan','Asllani',4,23,'Defensive Midfield'),(108,'Wilfred','Ndidi',4,29,'Defensive Midfield'),(109,'Kartal','Yılmaz',4,25,'Defensive Midfield'),(110,'Necip','Uysal',4,35,'Defensive Midfield'),(111,'Orkun','Kökçü',4,25,'Central Midfield'),(112,'Salih','Uçan',4,32,'Central Midfield'),(113,'Junior','Olaitan',4,23,'Attacking Midfield'),(114,'El Bilal','Touré',4,24,'Left Winger'),(115,'Jota','Silva',4,26,'Left Winger'),(116,'Devrim','Şahin',4,18,'Left Winger'),(117,'Vaclav','Cerny',4,28,'Right Winger'),(118,'Cengiz','Ünder',4,28,'Right Winger'),(119,'Milot','Rashica',4,29,'Right Winger'),(120,'Hyeon-gyu','Oh',4,24,'Centre-Forward'),(121,'Mustafa','Hekimoğlu',4,18,'Centre-Forward'),(125,'Mateusz','Lis',5,29,'Goalkeeper'),(126,'Ekrem','Kılıçarslan',5,28,'Goalkeeper'),(127,'Şamil','Öztürk',5,20,'Goalkeeper'),(128,'Nevzat','Üzel',5,18,'Goalkeeper'),(129,'Taha','Altıkardeş',5,22,'Centre-Back'),(130,'Malcom','Bokele',5,26,'Centre-Back'),(131,'Furkan','Bayır',5,26,'Centre-Back'),(132,'Héliton','',5,30,'Centre-Back'),(133,'Allan','Godói',5,32,'Centre-Back'),(134,'Ege','Yıldırım',5,18,'Centre-Back'),(135,'Anthony','Dennis',5,21,'Defensive Midfield'),(136,'Novatus','Miroshi',5,23,'Defensive Midfield'),(137,'Musah','Mohammed',5,24,'Defensive Midfield'),(138,'Furkan','Malak',5,21,'Central Midfield'),(139,'Arda Okan','Kurtulan',5,23,'Right Midfield'),(140,'Ogün','Bayrak',5,27,'Right Midfield'),(141,'Uğur Kaan','Yıldız',5,23,'Right Midfield'),(142,'Amin','Cherni',5,24,'Left Midfield'),(143,'İsmail','Köybaşı',5,36,'Left Midfield'),(144,'Filip','Krastev',5,24,'Attacking Midfield'),(145,'Alexis','Antunes',5,25,'Attacking Midfield'),(146,'Efkan','Bekiroğlu',5,30,'Attacking Midfield'),(147,'Juan','',5,23,'Centre-Forward'),(148,'Janderson','',5,26,'Centre-Forward'),(149,'Jeh','',5,26,'Centre-Forward'),(150,'Guilherme','Luiz',5,20,'Centre-Forward'),(156,'Muhammed','Şengezer',6,29,'Goalkeeper'),(157,'Doğan','Alemdar',6,23,'Goalkeeper'),(158,'Volkan','Babacan',6,37,'Goalkeeper'),(159,'Luca','Stancic',6,19,'Goalkeeper'),(160,'Jerome','Opoku',6,27,'Centre-Back'),(161,'Léo','Duarte',6,29,'Centre-Back'),(162,'Hamza','Güreler',6,19,'Centre-Back'),(163,'Ousseynou','Ba',6,30,'Centre-Back'),(164,'Christopher','Operi',6,28,'Left-Back'),(165,'Kazımcan','Karataş',6,23,'Left-Back'),(166,'Festy','Ebosele',6,23,'Right-Back'),(167,'Onur','Bulut',6,31,'Right-Back'),(168,'Ömer Ali','Şahiner',6,34,'Right-Back'),(169,'Jakub','Kaluzinski',6,23,'Defensive Midfield'),(170,'Berat','Özdemir',6,27,'Defensive Midfield'),(171,'Onur','Ergün',6,33,'Defensive Midfield'),(172,'Miguel','Crespo',6,29,'Central Midfield'),(173,'Olivier','Kemen',6,29,'Central Midfield'),(174,'Umut','Güneş',6,25,'Central Midfield'),(175,'Amine','Harit',6,28,'Left Winger'),(176,'Ivan','Brnic',6,24,'Left Winger'),(177,'Berkay','Aslan',6,19,'Left Winger'),(178,'Abbosbek','Fayzullaev',6,22,'Right Winger'),(179,'Yusuf','Sarı',6,27,'Right Winger'),(180,'Eldor','Shomurodov',6,30,'Centre-Forward'),(181,'Davie','Selke',6,31,'Centre-Forward'),(182,'Bertuğ','Yıldırım',6,23,'Centre-Forward'),(183,'Nuno Da','Costa',6,35,'Centre-Forward'),(187,'Okan','Kocuk',7,30,'Goalkeeper'),(188,'İrfan Can','Eğribayat',7,27,'Goalkeeper'),(189,'Efe Yiğit','Üstün',7,17,'Goalkeeper'),(190,'Efe Berat','Törüz',7,19,'Goalkeeper'),(191,'Rick','van Drongelen',7,27,'Centre-Back'),(192,'Toni','Borevković',7,28,'Centre-Back'),(193,'Lubomir','Satka',7,30,'Centre-Back'),(194,'Bedirhan','Çetin',7,19,'Centre-Back'),(195,'Ali Badra','Diabaté',7,19,'Centre-Back'),(196,'Logi','Tómasson',7,25,'Left-Back'),(197,'Soner','Gönül',7,28,'Left-Back'),(198,'Enes','Albak',7,20,'Left-Back'),(199,'Joe','Mendes',7,23,'Right-Back'),(200,'Zeki','Yavru',7,34,'Right-Back'),(201,'Antoine','Makoumbou',7,27,'Defensive Midfield'),(202,'Yunus Emre','Çift',7,22,'Defensive Midfield'),(203,'Franck','Atoen',7,19,'Defensive Midfield'),(204,'Eyüp','Değirmenci',7,18,'Defensive Midfield'),(205,'Olivier','Ntcham',7,30,'Central Midfield'),(206,'Celil','Yüksel',7,28,'Central Midfield'),(207,'Yalçın','Kayan',7,27,'Central Midfield'),(208,'Muhammet','Özbaskıcı',7,20,'Central Midfield'),(209,'Alper Efe','Pazar',7,21,'Central Midfield'),(210,'Carlo','Holse',7,26,'Attacking Midfield'),(211,'Afonso','Sousa',7,25,'Attacking Midfield'),(212,'Jaurès','Assoumou',7,23,'Left Winger'),(213,'Tahsin','Bülbül',7,19,'Left Winger'),(214,'Saikuba','Jarju',7,18,'Left Winger'),(215,'Elayis','Tavsan',7,24,'Right Winger'),(216,'Emre','Kılınç',7,31,'Right Winger'),(217,'Tanguy','Coulibaly',7,25,'Right Winger'),(218,'Cherif','Ndiaye',7,30,'Centre-Forward'),(219,'Marius','Mouandilmadji',7,28,'Centre-Forward'),(220,'Ebrima','Ceesay',7,19,'Centre-Forward'),(250,'Aleksandar','Jovanovic',8,33,'Goalkeeper'),(251,'Serhat','Öztaşdelen',8,21,'Goalkeeper'),(252,'Gökhan','Değirmenci',8,36,'Goalkeeper'),(253,'Botond','Balogh',8,23,'Centre-Back'),(254,'Hrvoje','Smolcic',8,25,'Centre-Back'),(255,'Mateusz','Wieteska',8,29,'Centre-Back'),(256,'Massadio','Haïdara',8,33,'Left-Back'),(257,'Muharrem','Cinan',8,27,'Left-Back'),(258,'Anfernee','Dijksteel',8,29,'Right-Back'),(259,'Ahmet','Oğuz',8,33,'Right-Back'),(260,'Show','',8,26,'Defensive Midfield'),(261,'Mahamadou','Susoho',8,21,'Defensive Midfield'),(262,'Habib','Keïta',8,24,'Central Midfield'),(263,'Joseph','Nonge',8,20,'Central Midfield'),(264,'Karol','Linetty',8,31,'Central Midfield'),(265,'Samet','Yalçın',8,31,'Central Midfield'),(266,'Darko','Churlinov',8,25,'Left Winger'),(267,'Rigoberto','Rivas',8,27,'Left Winger'),(268,'Tayfur','Bingöl',8,33,'Left Winger'),(269,'Furkan','Gedik',8,23,'Left Winger'),(270,'Can','Keleş',8,24,'Right Winger'),(271,'Dan','Agyei',8,28,'Right Winger'),(272,'Bruno','Petkovic',8,31,'Centre-Forward'),(273,'Ahmet','Sağat',8,29,'Centre-Forward'),(274,'Serdar','Dursun',8,34,'Centre-Forward'),(281,'Zafer','Görgen',9,25,'Goalkeeper'),(282,'Burak','Bozan',9,25,'Goalkeeper'),(283,'Tayyip Talha','Sanuç',9,26,'Centre-Back'),(284,'Nihad','Mujakic',9,27,'Centre-Back'),(285,'Arda','Kızıldağ',9,27,'Centre-Back'),(286,'Myenty','Abena',9,31,'Centre-Back'),(287,'Nazım','Sangaré',9,31,'Centre-Back'),(288,'Kévin','Rodrigues',9,31,'Left-Back'),(289,'Deian','Sorescu',9,28,'Right-Back'),(290,'Luis','Pérez',9,31,'Right-Back'),(291,'Salem','MBakata',9,27,'Right-Back'),(292,'Melih','Kabasakal',9,30,'Defensive Midfield'),(293,'Ogün','Özçiçek',9,27,'Defensive Midfield'),(294,'Drissa','Camara',9,24,'Central Midfield'),(295,'Karamba','Gassama',9,21,'Central Midfield'),(296,'Kacper','Kozlowski',9,22,'Attacking Midfield'),(297,'Alexandru','Maxim',9,35,'Attacking Midfield'),(298,'Victor Ntino-Emo','Gidado',9,21,'Attacking Midfield'),(299,'Yusuf','Kabadayi',9,22,'Left Winger'),(300,'Christopher','Lungoyi',9,25,'Left Winger'),(301,'Ali Osman','Kalın',9,17,'Left Winger'),(302,'Ali Mevran','Ablak',9,22,'Right Winger'),(303,'Mohamed','Bayo',9,27,'Centre-Forward'),(304,'Denis','Drăguș',9,26,'Centre-Forward'),(305,'Muhammet','Akmelek',9,16,'Centre-Forward'),(312,'Yahia','Fofana',10,25,'Goalkeeper'),(313,'Erdem','Canpolat',10,24,'Goalkeeper'),(314,'Efe','Doğan',10,21,'Goalkeeper'),(315,'Attila','Mocsi',10,25,'Centre-Back'),(316,'Modibo','Sagnan',10,26,'Centre-Back'),(317,'Khusniddin','Alikulov',10,26,'Centre-Back'),(318,'Samet','Akaydin',10,31,'Centre-Back'),(319,'Emir','Ortakaya',10,21,'Centre-Back'),(320,'Mithat','Pala',10,25,'Left-Back'),(321,'Casper','Højer',10,31,'Left-Back'),(322,'Taha','Şahin',10,25,'Right-Back'),(323,'Furkan','Orak',10,24,'Right-Back'),(324,'Giannis','Papanikolaou',10,27,'Defensive Midfield'),(325,'Qazim','Laci',10,30,'Central Midfield'),(326,'Ibrahim','Olawoyin',10,28,'Central Midfield'),(327,'Muhamed','Buljubasic',10,21,'Central Midfield'),(328,'Taylan','Antalyalı',10,31,'Central Midfield'),(329,'Valentin','Mihăilă',10,26,'Left Winger'),(330,'Altin','Zeqiri',10,25,'Left Winger'),(331,'Emrecan','Bulut',10,23,'Left Winger'),(332,'Loide','Augusto',10,26,'Right Winger'),(333,'Adedire','Mebude',10,21,'Right Winger'),(334,'Frantzdy','Pierrot',10,30,'Centre-Forward'),(335,'Ali','Sowe',10,31,'Centre-Forward'),(336,'Halil','Dervişoğlu',10,26,'Centre-Forward'),(343,'Ertuğrul','Taşkıran',11,36,'Goalkeeper'),(344,'Paulo','Victor',11,39,'Goalkeeper'),(345,'Nuno','Lima',11,24,'Centre-Back'),(346,'Ümit','Akdağ',11,22,'Centre-Back'),(347,'Fatih','Aksoy',11,28,'Centre-Back'),(348,'Fidan','Aliti',11,32,'Centre-Back'),(349,'Bruno','Viana',11,31,'Centre-Back'),(350,'Batuhan','Yavuz',11,20,'Right-Back'),(351,'Maestro','Maestro',11,22,'Defensive Midfield'),(352,'Gaius','Makouta',11,28,'Defensive Midfield'),(353,'Nicolas','Janvier',11,27,'Central Midfield'),(354,'İzzet','Çelik',11,21,'Central Midfield'),(355,'Buluthan','Bulut',11,23,'Central Midfield'),(356,'Florent','Hadergjonaj',11,31,'Right Midfield'),(357,'Enes','Keskin',11,24,'Right Midfield'),(358,'Ruan','Ruan',11,20,'Left Midfield'),(359,'Baran','Moğultay',11,21,'Left Midfield'),(360,'Yusuf','Özdemir',11,25,'Left Midfield'),(361,'Meschack','Elia',11,28,'Attacking Midfield'),(362,'Ianis','Hagi',11,27,'Attacking Midfield'),(363,'İbrahim','Kaya',11,24,'Attacking Midfield'),(364,'Ui-jo','Hwang',11,33,'Attacking Midfield'),(365,'Efecan','Karaca',11,36,'Attacking Midfield'),(366,'Yusuf Can','Karademir',11,18,'Attacking Midfield'),(367,'Steve','Mounié',11,31,'Centre-Forward'),(368,'Güven','Yalçın',11,27,'Centre-Forward'),(374,'Ricardo','Velho',12,27,'Goalkeeper'),(375,'Erhan','Erentürk',12,30,'Goalkeeper'),(376,'Ebrar','Aydın',12,25,'Goalkeeper'),(377,'Berk Deniz','Çukurcu',12,18,'Goalkeeper'),(378,'Dimitrios','Goutas',12,31,'Centre-Back'),(379,'Thalisson','Thalisson',12,27,'Centre-Back'),(380,'Zan','Zuzek',12,29,'Centre-Back'),(381,'Abdullah','Şahindere',12,22,'Centre-Back'),(382,'Umut','İslamoğlu',12,19,'Centre-Back'),(383,'Arda Çağan','Çelik',12,20,'Centre-Back'),(384,'Abdurrahim','Dursun',12,27,'Left-Back'),(385,'Matej','Hanousek',12,32,'Left-Back'),(386,'Yiğit Hamza','Aydar',12,17,'Left-Back'),(387,'Pedro','Pereira',12,28,'Right-Back'),(388,'Fıratcan','Üzüm',12,26,'Right-Back'),(389,'Emirhan','Ünal',12,21,'Right-Back'),(390,'Tom','Dele-Bashiru',12,26,'Defensive Midfield'),(391,'Moussa','Kyabou',12,27,'Defensive Midfield'),(392,'Peter','Etebo',12,30,'Defensive Midfield'),(393,'Oğulcan','Ülgün',12,27,'Central Midfield'),(394,'Franco','Tongya',12,23,'Central Midfield'),(395,'Samed','Onur',12,23,'Central Midfield'),(396,'Ensar','Kemaloğlu',12,27,'Central Midfield'),(397,'Dal','Varesanovic',12,24,'Attacking Midfield'),(398,'Henry','Onyekuru',12,28,'Left Winger'),(399,'Metehan','Mimaroğlu',12,31,'Left Winger'),(400,'Adama','Traoré',12,30,'Right Winger'),(401,'Cihan','Çanak',12,21,'Right Winger'),(402,'Göktan','Gürpüz',12,23,'Right Winger'),(403,'Sékou','Koïta',12,26,'Second Striker'),(404,'M\'Baye','Niang',12,31,'Centre-Forward'),(405,'Ayaz','Özcan',12,16,'Centre-Forward'),(437,'Abdullah','Yiğiter',13,26,'Goalkeeper'),(438,'Julián','Cuesta',13,34,'Goalkeeper'),(439,'Kağan','Arıcan',13,19,'Goalkeeper'),(440,'Georgiy','Dzhikiya',13,32,'Centre-Back'),(441,'Lautaro','Giannetti',13,32,'Centre-Back'),(442,'Hüseyin','Türkmen',13,28,'Centre-Back'),(443,'Bahadır','Öztürk',13,30,'Centre-Back'),(444,'Veysel','Sarı',13,37,'Centre-Back'),(445,'Ensar Buğra','Tivsiz',13,18,'Centre-Back'),(446,'Ege','İzmirli',13,18,'Centre-Back'),(447,'Kenneth','Paal',13,28,'Left-Back'),(448,'Samet','Karakoç',13,23,'Left-Back'),(449,'Bünyamin','Balcı',13,25,'Right-Back'),(450,'Erdoğan','Yeşilyurt',13,32,'Right-Back'),(451,'Jesper','Ceesay',13,24,'Defensive Midfield'),(452,'Soner','Dikmen',13,32,'Central Midfield'),(453,'Dario','Saric',13,28,'Central Midfield'),(454,'Yakub','İlçin',13,16,'Central Midfield'),(455,'Abdülkadir','Ömür',13,26,'Attacking Midfield'),(456,'Ramzi','Safuri',13,30,'Attacking Midfield'),(457,'Sander','van de Streek',13,32,'Attacking Midfield'),(458,'Nikola','Storm',13,31,'Left Winger'),(459,'Doğukan','Sinik',13,27,'Left Winger'),(460,'Berkay','Topdemir',13,19,'Left Winger'),(461,'Samuel','Ballet',13,24,'Right Winger'),(462,'Yohan','Boli',13,32,'Centre-Forward'),(463,'Bachir','Gueye',13,22,'Centre-Forward'),(464,'Kerem','Kayaarası',13,19,'Centre-Forward'),(468,'Deniz','Ertaş',14,20,'Goalkeeper'),(469,'Bahadır','Güngördü',14,30,'Goalkeeper'),(470,'Egemen','Aydın',14,18,'Goalkeeper'),(471,'Adamo','Nagalo',14,23,'Centre-Back'),(472,'Riechedly','Bazoer',14,29,'Centre-Back'),(473,'Adil','Demirbağ',14,28,'Centre-Back'),(474,'Rayyan','Baniya',14,27,'Centre-Back'),(475,'Uğurcan','Yazğılı',14,26,'Centre-Back'),(476,'Josip','Calusic',14,32,'Centre-Back'),(477,'Arif','Boşluk',14,22,'Left-Back'),(478,'Guilherme','Guilherme',14,35,'Left-Back'),(479,'Yasir','Subaşı',14,30,'Left-Back'),(480,'Yhoan','Andzouana',14,29,'Right-Back'),(481,'Jin-ho','Jo',14,22,'Defensive Midfield'),(482,'Marko','Jevtovic',14,32,'Defensive Midfield'),(483,'Ufuk','Akyol',14,28,'Defensive Midfield'),(484,'Berkan','Kutlu',14,28,'Central Midfield'),(485,'Melih','İbrahimoğlu',14,25,'Central Midfield'),(486,'Morten','Bjørlo',14,30,'Central Midfield'),(487,'Esat','Buğa',14,19,'Central Midfield'),(488,'Enis','Bardhi',14,30,'Attacking Midfield'),(489,'Kazeem','Olaigbe',14,23,'Left Winger'),(490,'Diogo','Gonçalves',14,29,'Left Winger'),(491,'Pedrinho','Pedrinho',14,29,'Left Winger'),(492,'Sander','Svendsen',14,28,'Left Winger'),(493,'Tunahan','Taşçı',14,23,'Right Winger'),(494,'Marius','Ștefănescu',14,27,'Right Winger'),(495,'Deniz','Türüç',14,33,'Right Winger'),(496,'Jackson','Muleka',14,26,'Centre-Forward'),(497,'Blaz','Kramer',14,29,'Centre-Forward'),(499,'Marcos','Felipe',15,29,'Goalkeeper'),(500,'Jankat','Yılmaz',15,21,'Goalkeeper'),(501,'Umut','Keseci',15,22,'Goalkeeper'),(502,'Anıl','Yaşar',15,23,'Centre-Back'),(503,'Luccas','Claro',15,34,'Centre-Back'),(504,'Bedirhan','Özyurt',15,22,'Centre-Back'),(505,'Jérôme','Onguéné',15,28,'Centre-Back'),(506,'Gilbert','Mendy',15,21,'Centre-Back'),(507,'Diabel','Ndoye',15,18,'Centre-Back'),(508,'Umut','Meraş',15,30,'Left-Back'),(509,'Arda','Yavuz',15,19,'Left-Back'),(510,'Calegari','Calegari',15,24,'Right-Back'),(511,'Denis','Radu',15,22,'Right-Back'),(512,'Talha','Ülvan',15,24,'Right-Back'),(513,'Mateusz','Legowski',15,23,'Defensive Midfield'),(514,'Baran','Gezek',15,20,'Defensive Midfield'),(515,'Taşkın','İlter',15,31,'Defensive Midfield'),(516,'Charles-André','Raux-Yao',15,24,'Central Midfield'),(517,'Emre','Akbaba',15,33,'Attacking Midfield'),(518,'Ismaila','Manga',15,18,'Attacking Midfield'),(519,'Lenny','Pintor',15,25,'Left Winger'),(520,'Ángel','Torres',15,25,'Right Winger'),(521,'Dorin','Rotariu',15,30,'Right Winger'),(522,'Christ','Sadia',15,18,'Right Winger'),(523,'Umut','Bozok',15,29,'Centre-Forward'),(524,'Metehan','Altunbaş',15,23,'Centre-Forward'),(525,'Abdou Khadre','Sy',15,18,'Centre-Forward'),(530,'Andreas','Gianniotis',16,33,'Goalkeeper'),(531,'Ali Emre','Yanar',16,27,'Goalkeeper'),(532,'Ege','Albayrak',16,18,'Goalkeeper'),(533,'Şant','Kazancı',16,17,'Goalkeeper'),(534,'Rodrigo','Becão',16,30,'Centre-Back'),(535,'Nicholas','Opoku',16,28,'Centre-Back'),(536,'Adem','Arous',16,21,'Centre-Back'),(537,'Taylan','Aydın',16,20,'Centre-Back'),(538,'Ahmet Taha','Dağbaşı',16,20,'Centre-Back'),(539,'Godfried','Frimpong',16,26,'Left-Back'),(540,'Emre','Taşdemir',16,30,'Left-Back'),(541,'Cláudio','Winck',16,31,'Right-Back'),(542,'Kamil Ahmet','Çörekçi',16,34,'Right-Back'),(543,'Berkay','Muratoğlu',16,18,'Right-Back'),(544,'Andri Fannar','Baldursson',16,24,'Defensive Midfield'),(545,'Burak','Gültekin',16,19,'Defensive Midfield'),(546,'Kerem','Demirbay',16,32,'Central Midfield'),(547,'Eyüp','Aydın',16,21,'Central Midfield'),(548,'Cafú','Cafú',16,33,'Central Midfield'),(549,'Haris','Hajradinovic',16,32,'Attacking Midfield'),(550,'Adrian','Benedyczak',16,25,'Left Winger'),(551,'Mortadha','Ben Ouanes',16,31,'Left Winger'),(552,'Ali Yavuz','Kol',16,25,'Left Winger'),(553,'Erdem','Çetinkaya',16,24,'Left Winger'),(554,'İrfan Can','Kahveci',16,30,'Right Winger'),(555,'Jim','Allevinah',16,31,'Right Winger'),(556,'Fousseni','Diabaté',16,30,'Right Winger'),(557,'Pape Habib','Guèye',16,26,'Centre-Forward'),(558,'Yusuf','Barası',16,22,'Centre-Forward'),(559,'Kubilay','Kanatsızkuş',16,28,'Centre-Forward'),(560,'Cenk','Tosun',16,34,'Centre-Forward'),(561,'Bilal','Bayazıt',17,26,'Goalkeeper'),(562,'Deniz','Dönmezer',17,17,'Goalkeeper'),(563,'Onurcan','Piri',17,31,'Goalkeeper'),(564,'Majid','Hosseini',17,29,'Centre-Back'),(565,'Semih','Güler',17,31,'Centre-Back'),(566,'Stefano','Denswil',17,32,'Centre-Back'),(567,'Jadel','Katongo',17,21,'Centre-Back'),(568,'Kayra','Cihan',17,18,'Centre-Back'),(569,'Abdulsamet','Burak',17,29,'Centre-Back'),(570,'Lionel','Carole',17,34,'Left-Back'),(571,'Joshua','Brenet',17,31,'Right-Back'),(572,'Burak','Kapacak',17,26,'Right-Back'),(573,'Youssef','Aït Bennasser',17,29,'Defensive Midfield'),(574,'Dorukhan','Toköz',17,29,'Defensive Midfield'),(575,'László','Bénes',17,28,'Central Midfield'),(576,'Görkem','Sağlam',17,27,'Central Midfield'),(577,'Furkan','Soyalp',17,30,'Central Midfield'),(578,'Yiğit Emre','Çeltik',17,22,'Central Midfield'),(579,'João','Mendes',17,31,'Attacking Midfield'),(580,'Eray','Özbek',17,23,'Attacking Midfield'),(581,'Miguel','Cardoso',17,31,'Left Winger'),(582,'Sam','Mather',17,21,'Left Winger'),(583,'Nurettin','Korkmaz',17,23,'Left Winger'),(584,'Denis','Makarov',17,28,'Right Winger'),(585,'Carlos','Mané',17,31,'Right Winger'),(586,'Ramazan','Civelek',17,30,'Right Winger'),(587,'Fedor','Chalov',17,27,'Centre-Forward'),(588,'German','Onugkha',17,29,'Centre-Forward'),(589,'Indrit','Tuci',17,25,'Centre-Forward'),(590,'Talha','Sarıarslan',17,22,'Centre-Forward'),(592,'Ivo','Grbic',18,30,'Goalkeeper'),(593,'Furkan','Bekleviç',18,27,'Goalkeeper'),(594,'Kerem','Yandal',18,19,'Goalkeeper'),(595,'Berke Can','Evli',18,16,'Goalkeeper'),(596,'Igor','Lichnovsky',18,31,'Centre-Back'),(597,'Davide','Biraschi',18,31,'Centre-Back'),(598,'Fatih','Kurucuk',18,28,'Centre-Back'),(599,'Anıl Yiğit','Çınar',18,22,'Centre-Back'),(600,'Burhan','Ersoy',18,22,'Centre-Back'),(601,'Muhammed','Kadıoğlu',18,19,'Centre-Back'),(602,'Filip','Mladenovic',18,34,'Left-Back'),(603,'Çağtay','Kurukalıp',18,24,'Left-Back'),(604,'Ricardo','Esgaio',18,32,'Right-Back'),(605,'Bartuğ','Elmaz',18,23,'Defensive Midfield'),(606,'Matías','Kranevitter',18,32,'Defensive Midfield'),(607,'Yaya','Onogo',18,18,'Defensive Midfield'),(608,'Berkay','Özcan',18,28,'Central Midfield'),(609,'Daniel','Johnson',18,33,'Central Midfield'),(610,'Tuğbey','Akgün',18,22,'Central Midfield'),(611,'Sam','Larsson',18,32,'Attacking Midfield'),(612,'Serginho','',18,30,'Left Winger'),(613,'Ahmet','Sivri',18,26,'Left Winger'),(614,'Barış','Kalaycı',18,20,'Left Winger'),(615,'Shavy','Babicka',18,25,'Right Winger'),(616,'Daniele','Verde',18,29,'Right Winger'),(617,'João','Camacho',18,31,'Right Winger'),(618,'Tarık Buğra','Kalpaklı',18,16,'Right Winger'),(619,'Ahmed','Traore',18,18,'Right Winger'),(620,'Tiago','Çukur',18,23,'Centre-Forward'),(621,'Moussa','Kone',18,18,'Centre-Forward');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
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
  CONSTRAINT `fk_product_pic` FOREIGN KEY (`PicID`) REFERENCES `pics` (`PicID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_product_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
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
  CONSTRAINT `fk_rating_player` FOREIGN KEY (`PlayerID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rating_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `TeamID` int NOT NULL AUTO_INCREMENT,
  `TeamName` varchar(100) NOT NULL,
  PRIMARY KEY (`TeamID`),
  UNIQUE KEY `uq_team_name` (`TeamName`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (11,'Alanyaspor'),(13,'Antalyaspor'),(6,'Basaksehir FK'),(4,'Beşiktaş JK'),(10,'Çaykur Rizespor'),(15,'Eyüpspor'),(18,'Fatih Karagümrük'),(1,'Fenerbahçe'),(2,'Galatasaray'),(9,'Gaziantep FK'),(12,'Genclerbirligi Ankara'),(5,'Göztepe'),(16,'Kasimpasa'),(17,'Kayserispor'),(8,'Kocaelispor'),(14,'Konyaspor'),(7,'Samsunspor'),(3,'Trabzonspor');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
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
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-03 10:46:21
