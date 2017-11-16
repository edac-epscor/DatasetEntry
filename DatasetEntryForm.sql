-- MySQL dump 10.14  Distrib 5.5.41-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: DatasetEntryForm
-- ------------------------------------------------------
-- Server version	5.5.41-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categorytitle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'Bioalgal Energy'),(2,'Geothermal'),(3,'Osmotic Power'),(5,'Social and Natural Science Nexus'),(6,'Solar Energy'),(7,'Uranium'),(8,'Workforce Development');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checks`
--

DROP TABLE IF EXISTS `checks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checks` (
  `datasetid` int(11) DEFAULT NULL,
  `datasetnamebool` tinyint(1) NOT NULL DEFAULT '0',
  `firstnamebool` tinyint(1) NOT NULL DEFAULT '0',
  `lastnamebool` tinyint(1) NOT NULL DEFAULT '0',
  `emailbool` tinyint(1) NOT NULL DEFAULT '0',
  `phonebool` tinyint(1) NOT NULL DEFAULT '0',
  `firstnamepibool` tinyint(1) NOT NULL DEFAULT '0',
  `lastnamepibool` tinyint(1) NOT NULL DEFAULT '0',
  `emailpibool` tinyint(1) NOT NULL DEFAULT '0',
  `phonepibool` tinyint(1) NOT NULL DEFAULT '0',
  `abstractbool` tinyint(1) NOT NULL DEFAULT '0',
  `collectiontitlebool` tinyint(1) NOT NULL DEFAULT '0',
  `categorytitlebool` tinyint(1) NOT NULL DEFAULT '0',
  `subcategorytitlebool` tinyint(1) NOT NULL DEFAULT '0',
  `purposebool` tinyint(1) NOT NULL DEFAULT '0',
  `otherinfobool` tinyint(1) NOT NULL DEFAULT '0',
  `keywordsbool` tinyint(1) NOT NULL DEFAULT '0',
  `placenamesbool` tinyint(1) NOT NULL DEFAULT '0',
  `filenamebool` tinyint(1) NOT NULL DEFAULT '0',
  `filetypebool` tinyint(1) NOT NULL DEFAULT '0',
  `filedescriptionbool` tinyint(1) NOT NULL DEFAULT '0',
  `databool` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checks`
--


--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `collectiontitle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--


--
-- Table structure for table `datasets`
--

DROP TABLE IF EXISTS `datasets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datasets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datasetname` varchar(150) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `collectionid` int(11) DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryid` int(11) DEFAULT NULL,
  `institutionid` int(11) DEFAULT NULL,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `firstnamepi` varchar(20) DEFAULT NULL,
  `lastnamepi` varchar(20) DEFAULT NULL,
  `emailpi` varchar(50) DEFAULT NULL,
  `phonepi` varchar(20) DEFAULT NULL,
  `abstract` text,
  `purpose` text,
  `otherinfo` text,
  `keywords` varchar(200) DEFAULT NULL,
  `placenames` varchar(200) DEFAULT NULL,
  `deliverymethod` varchar(45) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `filetype` varchar(45) DEFAULT NULL,
  `filedescription` text,
  `licensename` varchar(50) DEFAULT NULL,
  `licensereference` varchar(50) DEFAULT NULL,
  `licensereason` text,
  `embargoreleasedate` datetime DEFAULT NULL,
  `embargoreason` text,
  `uploadtodataone` varchar(10) DEFAULT 'Yes',
  `step` int(11) DEFAULT NULL,
  `datecertified` datetime DEFAULT NULL,
  `isotopicid` int(11) DEFAULT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `taxonomy` int(11) DEFAULT NULL,
  `rejected` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datasets`
--


--
-- Table structure for table `deliverymethods`
--

DROP TABLE IF EXISTS `deliverymethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deliverymethods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliverymethods`
--

LOCK TABLES `deliverymethods` WRITE;
/*!40000 ALTER TABLE `deliverymethods` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliverymethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fieldinfo`
--

DROP TABLE IF EXISTS `fieldinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fieldinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datasetid` int(11) DEFAULT NULL,
  `field` varchar(150) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `units` varchar(50) DEFAULT NULL,
  `frequency` varchar(50) DEFAULT NULL,
  `aggregation` varchar(50) DEFAULT NULL,
  `nodata` varchar(50) DEFAULT NULL,
  `dommin` varchar(30) DEFAULT NULL,
  `dommax` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fieldinfo`
--


--
-- Table structure for table `filetypes`
--

DROP TABLE IF EXISTS `filetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filetypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  `istabulardata` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filetypes`
--

LOCK TABLES `filetypes` WRITE;
/*!40000 ALTER TABLE `filetypes` DISABLE KEYS */;
INSERT INTO `filetypes` VALUES (1,'*.jpg',0),(2,'*.gif',0),(3,'*.xlsx',1),(4,'*.tiff',0),(5,'*.other',0),(43,'*.xls',1),(40,'*.pdf',0),(41,'*.docx',0),(42,'*.csv',1),(46,'*.dat',1),(47,'*.shp',1),(53,'*.edi',1);
/*!40000 ALTER TABLE `filetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutions`
--

DROP TABLE IF EXISTS `institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institutions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `institutionname` varchar(50) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `instName_short` varchar(20) DEFAULT NULL,
  `address_1` varchar(70) DEFAULT NULL,
  `address_2` varchar(70) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `address_3` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutions`
--

LOCK TABLES `institutions` WRITE;
/*!40000 ALTER TABLE `institutions` DISABLE KEYS */;
INSERT INTO `institutions` VALUES (1,'Eastern New Mexico University',34.17690000,-103.34860000,'ENMU','1500 S. Avenue K',NULL,'Portales','New Mexico','88130',NULL),(2,'Explora!',35.09730000,-106.66440000,'Explora!','1701 Mountain Rd. NW',NULL,'Albuquerque','New Mexico','87104',NULL),(3,'Global Center For Cultural Entrepreneurship',35.68475500,-105.93225300,'GC4CE','341 E. Alameda St',NULL,'Santa Fe','New Mexico','87501-2229',NULL),(4,'New Mexico Consortium',35.87454400,-106.32843300,'NMC','Los Alamos Research Park','4200 West Jemez Rd','Los Alamos','New Mexico','87544','Suite 301'),(5,'New Mexico Highlands University',35.59694400,-105.22250000,'NMHU','1005 Diamond St',NULL,'Las Vegas','New Mexico','87701',NULL),(6,'New Mexico State University',32.28300000,-106.74800000,'NMSU','1780 E University Ave',NULL,'Las Cruces','New Mexico','88003',NULL),(7,'New Mexico Tech',34.06680000,-106.90560000,'NMT','801 Leroy Pl',NULL,'Socorro','New Mexico','87801',NULL),(8,'NM Museum of Natural History and Science',35.09810000,-106.66550000,'NMMNH','1801 Mountain Rd NW',NULL,'Albuquerque','New Mexico','87104',NULL),(10,'Sandia National Laboratories',35.04027800,-106.54972200,'SNL','1515 Eubank SE',NULL,'Albuquerque','New Mexico','87123',NULL),(11,'Santa Fe Community College',35.66722200,-105.96444400,'SFCC','6401 Richards Ave',NULL,'Santa Fe','New Mexico','87508',NULL),(12,'Santa Fe Institute',35.70050000,-105.90860000,'SFI','1399 Hyde Park Rd',NULL,'Santa Fe','New Mexico','87501',NULL),(13,'University of New Mexico',35.08390000,-106.61860000,'UNM','MSC11 6325','1 University of New Mexico','Albuquerque','New Mexico','87131',NULL),(14,'Valles Caldera National Preserve',35.90000000,-106.53330000,'VCNP','39201 NM State Highway 4',NULL,'Jemez Springs','New Mexico','87025',NULL),(15,'Western New Mexico University',32.77670000,-108.28390000,'WNMU','1000 W College Ave',NULL,'Silver City','New Mexico','88062',NULL),(16,'Water Resources Research Institute',32.28300000,-106.74800000,'WRRI','NMSU MSC 3167','P.O. Box 30001','Las Cruces','New Mexico','88003-8001',NULL);
/*!40000 ALTER TABLE `institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `isotopics`
--

DROP TABLE IF EXISTS `isotopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `isotopics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(45) DEFAULT NULL,
  `categorycode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `isotopics`
--

LOCK TABLES `isotopics` WRITE;
/*!40000 ALTER TABLE `isotopics` DISABLE KEYS */;
INSERT INTO `isotopics` VALUES (1,'Farming','001'),(2,'Biota','002'),(3,'Boundaries','003'),(4,'ClimatologyMeteorologyAtmosphere','004'),(5,'Economy','005'),(6,'Elevation','006'),(7,'Environment','007'),(8,'GeoscientificInformation','008'),(9,'Health','009'),(10,'ImageryBaseMapsEarthCover','010'),(11,'IntelligenceMilitary','011'),(12,'InlandWaters','012'),(13,'Location','013'),(14,'Oceans','014'),(15,'PLanningCadastre','015'),(16,'Society','016'),(17,'Structure','017'),(18,'Transportation','018'),(19,'UtilitiesCommunication','019');
/*!40000 ALTER TABLE `isotopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datasetid` int(11) DEFAULT NULL,
  `note` text,
  `date` datetime DEFAULT NULL,
  `decision` text,
  `userid` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--


--
-- Table structure for table `processes`
--

DROP TABLE IF EXISTS `processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datasetid` int(11) DEFAULT NULL,
  `dateperformed` datetime DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--


--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'In Progress'),(2,'Submitted for Approval'),(3,'Approved'),(4,'Certified'),(5,'Inserted into GSToRE');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorys`
--

DROP TABLE IF EXISTS `subcategorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `subcategorytitle` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorys`
--

LOCK TABLES `subcategorys` WRITE;
/*!40000 ALTER TABLE `subcategorys` DISABLE KEYS */;
INSERT INTO `subcategorys` VALUES (1,1,'Algae Productivity'),(2,1,'Encapsulated Algae'),(3,1,'Outdoor Cultivation Testbeds'),(4,1,'Wastewater Treatment'),(5,2,'Groundwater Analyses'),(6,2,'Magnetotelluric'),(7,2,'NM Hot Springs'),(8,2,'Thermochronology'),(9,2,'Water Chemistry'),(10,3,'Membrane Characterizations'),(11,3,'Produced Water Analyses'),(12,4,'N/A'),(13,5,'Human Behaviors and Attitudes'),(14,5,'Model Data Sources'),(15,5,'Model Outputs'),(16,6,'Excited State Polymers'),(17,6,'Magnetophotoluminescence'),(18,6,'Solar Fuels'),(19,7,'Aeolian Transport'),(20,7,'Mine Contamination'),(21,7,'Uranium Speciation'),(22,8,'Creative Startups'),(24,8,'Faculty Leadership and Professional Development Institute (FLPDI)'),(25,8,'Growing Up Thinking Computationally (GUTC)'),(26,8,'NM Information Science Education (NM ISE) Network');
/*!40000 ALTER TABLE `subcategorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxonomies`
--

DROP TABLE IF EXISTS `taxonomies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taxonomies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taxonomyname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxonomies`
--

LOCK TABLES `taxonomies` WRITE;
/*!40000 ALTER TABLE `taxonomies` DISABLE KEYS */;
INSERT INTO `taxonomies` VALUES (1,'file'),(2,'vector'),(3,'geoimage');
/*!40000 ALTER TABLE `taxonomies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `clearpassword` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `institutionname` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2017-11-07 13:12:59
