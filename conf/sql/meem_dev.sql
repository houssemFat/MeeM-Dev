-- MySQL dump 10.13  Distrib 5.6.11, for Win32 (x86)
--
-- Host: localhost    Database: meem_dev
-- ------------------------------------------------------
-- Server version	5.6.11

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
-- Table structure for table `accounts_emailaddress`
--

DROP TABLE IF EXISTS `accounts_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `email` varchar(75) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `user_id_refs_id_372b547f` (`user_id`),
  CONSTRAINT `user_id_refs_id_372b547f` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_emailaddress`
--

LOCK TABLES `accounts_emailaddress` WRITE;
/*!40000 ALTER TABLE `accounts_emailaddress` DISABLE KEYS */;
INSERT INTO `accounts_emailaddress` VALUES (26,76,'houcem902@live.fr',1,1),(27,81,'ho1ucem902@live.fr',0,1);
/*!40000 ALTER TABLE `accounts_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_emailconfirmation`
--

DROP TABLE IF EXISTS `accounts_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_address_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `sent` datetime DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `email_address_id_refs_id_c2583161` (`email_address_id`),
  CONSTRAINT `email_address_id_refs_id_c2583161` FOREIGN KEY (`email_address_id`) REFERENCES `accounts_emailaddress` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_emailconfirmation`
--

LOCK TABLES `accounts_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `accounts_emailconfirmation` DISABLE KEYS */;
INSERT INTO `accounts_emailconfirmation` VALUES (13,26,'2014-05-30 21:01:24','2014-05-30 21:03:27','dfdf5a97aa4ce71df1512610ad79c14814dfa3f44b45e4aaf58d9179610d4c40');
/*!40000 ALTER TABLE `accounts_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_inbox`
--

DROP TABLE IF EXISTS `accounts_inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_inbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(35) NOT NULL,
  `body` varchar(500) NOT NULL,
  `author_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sent_at` date DEFAULT NULL,
  `seen` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_inbox_e969df21` (`author_id`),
  KEY `accounts_inbox_75c2b81c` (`user_id`),
  CONSTRAINT `author_id_refs_id_3d31e9bf` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `user_id_refs_id_3d31e9bf` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_inbox`
--

LOCK TABLES `accounts_inbox` WRITE;
/*!40000 ALTER TABLE `accounts_inbox` DISABLE KEYS */;
INSERT INTO `accounts_inbox` VALUES (1,'sug','bdoy vwxcvxcv ',1,76,'2014-07-25',1),(2,'sugv 2 ','bdosy svdssvv xcxc wxcvxcv ',1,76,'0000-00-00',0);
/*!40000 ALTER TABLE `accounts_inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_notification`
--

DROP TABLE IF EXISTS `accounts_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `seen` tinyint(1) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `content_type_id_refs_id_c66ab80a` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_c66ab80a` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `user_id_refs_id_4bcb202b` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_notification`
--

LOCK TABLES `accounts_notification` WRITE;
/*!40000 ALTER TABLE `accounts_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_profile`
--

DROP TABLE IF EXISTS `accounts_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_profile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `lang_id` int(11) unsigned NOT NULL,
  `thumb` varchar(128) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_profile`
--

LOCK TABLES `accounts_profile` WRITE;
/*!40000 ALTER TABLE `accounts_profile` DISABLE KEYS */;
INSERT INTO `accounts_profile` VALUES (1,76,2,''),(2,3,2,'rer'),(3,79,2,''),(4,80,2,''),(5,81,2,''),(6,82,2,'');
/*!40000 ALTER TABLE `accounts_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user`
--

DROP TABLE IF EXISTS `accounts_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(35) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_manager` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) DEFAULT '0',
  `phone` int(20) unsigned DEFAULT NULL,
  `auth_type` int(1) unsigned DEFAULT NULL,
  `date_joined` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user`
--

LOCK TABLES `accounts_user` WRITE;
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` VALUES (1,'pbkdf2_sha256$10000$NbHFcErujz7Z$HjXePcVKWSISmKKgnJFEOtwsskeGU4x+CqS0AbdsxMw=','2014-05-11 21:55:18','fathallah.houssem@gmail.com','fathallah.houssem@gmail.com',0,0,1,NULL,NULL,NULL,NULL),(3,'pbkdf2_sha256$10000$jtqyDGTOrsh0$o1YpQ4utEgRkfRHVB68bb8UVfztcpRBDuS5P2bLrof8=','2014-05-28 12:54:29','houssem@gmail.com','houssem@gmail.com',0,0,0,NULL,NULL,0,NULL),(50,'pbkdf2_sha256$10000$m4ScRrilWYFL$VPZyjevjq5coFG/lbrw3impm/b7Y/j5sNwmBendbcJY=','2014-05-30 00:59:15','97854545@meem-temp.tn','97854545@meem-temp.tn',0,0,0,NULL,97854545,1,NULL),(62,'pbkdf2_sha256$10000$y3UFlC7OrtGt$LruUGKAIAGU1LIMnZIKvnE8L6ZvblB6g0YsfLftw060=','2014-05-30 13:39:05','97196094@meem-temp.tn','97196094@meem-temp.tn',0,0,0,NULL,97196094,1,NULL),(76,'pbkdf2_sha256$10000$9R2RXGxXu4oZ$6LasoKcnrQZEIoMK5iDa0RGq+gUeu6Lf/C6fVM73Pvo=','2014-08-27 15:26:12','houcem902@live.fr','houcem902@live.fr',1,0,0,NULL,NULL,0,NULL),(81,'pbkdf2_sha256$10000$XIQq5T78WNym$1I2FC7mNzEZkhQD7jK30dymvA76+MQ/zm5c10aH39jY=','2014-08-26 17:38:43','ho1ucem902@live.fr','Username',0,0,0,NULL,NULL,0,NULL),(82,'pbkdf2_sha256$10000$gM8wdL5YVkcy$U6RvMJtPz+ofF8YijSM17u0ICCq/yjJUB+1Cnd8Ka6E=','2014-08-26 22:56:06','admin@meem.org','h',1,0,1,0,NULL,0,'2014-08-26 22:54:55');
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `permission_id_refs_id_6ba0f519` (`permission_id`),
  CONSTRAINT `group_id_refs_id_f4b32aac` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `permission_id_refs_id_6ba0f519` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  CONSTRAINT `content_type_id_refs_id_d043b34a` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission'),(2,'Can change permission',1,'change_permission'),(3,'Can delete permission',1,'delete_permission'),(4,'Can add group',2,'add_group'),(5,'Can change group',2,'change_group'),(6,'Can delete group',2,'delete_group'),(7,'Can add content type',3,'add_contenttype'),(8,'Can change content type',3,'change_contenttype'),(9,'Can delete content type',3,'delete_contenttype'),(10,'Can add session',4,'add_session'),(11,'Can change session',4,'change_session'),(12,'Can delete session',4,'delete_session'),(13,'Can add site',5,'add_site'),(14,'Can change site',5,'change_site'),(15,'Can delete site',5,'delete_site'),(16,'Can add log entry',6,'add_logentry'),(17,'Can change log entry',6,'change_logentry'),(18,'Can delete log entry',6,'delete_logentry'),(22,'Can add email address',8,'add_emailaddress'),(23,'Can change email address',8,'change_emailaddress'),(24,'Can delete email address',8,'delete_emailaddress'),(25,'Can add email confirmation',9,'add_emailconfirmation'),(26,'Can change email confirmation',9,'change_emailconfirmation'),(27,'Can delete email confirmation',9,'delete_emailconfirmation'),(28,'Can add professor profile',10,'add_professorprofile'),(29,'Can change professor profile',10,'change_professorprofile'),(30,'Can delete professor profile',10,'delete_professorprofile'),(31,'Can add professor web link',11,'add_professorweblink'),(32,'Can change professor web link',11,'change_professorweblink'),(33,'Can delete professor web link',11,'delete_professorweblink'),(34,'Can add professor privacy',12,'add_professorprivacy'),(35,'Can change professor privacy',12,'change_professorprivacy'),(36,'Can delete professor privacy',12,'delete_professorprivacy'),(37,'Can add professor message',13,'add_professormessage'),(38,'Can change professor message',13,'change_professormessage'),(39,'Can delete professor message',13,'delete_professormessage'),(40,'Can add student profile',14,'add_studentprofile'),(41,'Can change student profile',14,'change_studentprofile'),(42,'Can delete student profile',14,'delete_studentprofile'),(43,'Can add chapter',15,'add_chapter'),(44,'Can change chapter',15,'change_chapter'),(45,'Can delete chapter',15,'delete_chapter'),(55,'Can add country',19,'add_country'),(56,'Can change country',19,'change_country'),(57,'Can delete country',19,'delete_country'),(58,'Can add state',20,'add_state'),(59,'Can change state',20,'change_state'),(60,'Can delete state',20,'delete_state'),(61,'Can add region',21,'add_region'),(62,'Can change region',21,'change_region'),(63,'Can delete region',21,'delete_region'),(64,'Can add contact',22,'add_contact'),(65,'Can change contact',22,'change_contact'),(66,'Can delete contact',22,'delete_contact'),(67,'Can add category',23,'add_category'),(68,'Can change category',23,'change_category'),(69,'Can delete category',23,'delete_category'),(70,'Can add course',24,'add_course'),(71,'Can change course',24,'change_course'),(72,'Can delete course',24,'delete_course'),(79,'Can add level',27,'add_level'),(80,'Can change level',27,'change_level'),(81,'Can delete level',27,'delete_level'),(82,'Can add profile',28,'add_profile'),(83,'Can change profile',28,'change_profile'),(84,'Can delete profile',28,'delete_profile'),(85,'Can add student',29,'add_student'),(86,'Can change student',29,'change_student'),(87,'Can delete student',29,'delete_student'),(88,'Can add teacher',30,'add_teacher'),(89,'Can change teacher',30,'change_teacher'),(90,'Can delete teacher',30,'delete_teacher'),(100,'Can add lang',34,'add_lang'),(101,'Can change lang',34,'change_lang'),(102,'Can delete lang',34,'delete_lang'),(103,'Can add course subscriber',35,'add_coursesubscriber'),(104,'Can change course subscriber',35,'change_coursesubscriber'),(105,'Can delete course subscriber',35,'delete_coursesubscriber'),(106,'Can add team',36,'add_team'),(107,'Can change team',36,'change_team'),(108,'Can delete team',36,'delete_team'),(109,'Can add team member ship',37,'add_teammembership'),(110,'Can change team member ship',37,'change_teammembership'),(111,'Can delete team member ship',37,'delete_teammembership'),(112,'Can add team member rules',38,'add_teammemberrules'),(113,'Can change team member rules',38,'change_teammemberrules'),(114,'Can delete team member rules',38,'delete_teammemberrules'),(127,'Can add notification',43,'add_notification'),(128,'Can change notification',43,'change_notification'),(129,'Can delete notification',43,'delete_notification'),(130,'Can add message',44,'add_message'),(131,'Can change message',44,'change_message'),(132,'Can delete message',44,'delete_message'),(151,'Can add teacher collaboration task',51,'add_teachercollaborationtask'),(152,'Can change teacher collaboration task',51,'change_teachercollaborationtask'),(153,'Can delete teacher collaboration task',51,'delete_teachercollaborationtask'),(157,'Can add collaborator',53,'add_collaborator'),(158,'Can change collaborator',53,'change_collaborator'),(159,'Can delete collaborator',53,'delete_collaborator'),(160,'Can add team',54,'add_team'),(161,'Can change team',54,'change_team'),(162,'Can delete team',54,'delete_team'),(163,'Can add team member ship',55,'add_teammembership'),(164,'Can change team member ship',55,'change_teammembership'),(165,'Can delete team member ship',55,'delete_teammembership'),(175,'Can add video',59,'add_video'),(176,'Can change video',59,'change_video'),(177,'Can delete video',59,'delete_video'),(181,'Can add comment',61,'add_comment'),(182,'Can change comment',61,'change_comment'),(183,'Can delete comment',61,'delete_comment'),(184,'Can add user',62,'add_user'),(185,'Can change user',62,'change_user'),(186,'Can delete user',62,'delete_user'),(187,'Can add teacher profile',63,'add_teacherprofile'),(188,'Can change teacher profile',63,'change_teacherprofile'),(189,'Can delete teacher profile',63,'delete_teacherprofile'),(190,'Can add teacher privacy',64,'add_teacherprivacy'),(191,'Can change teacher privacy',64,'change_teacherprivacy'),(192,'Can delete teacher privacy',64,'delete_teacherprivacy'),(193,'Can add document',65,'add_document'),(194,'Can change document',65,'change_document'),(195,'Can delete document',65,'delete_document'),(196,'Can add quiz',66,'add_quiz'),(197,'Can change quiz',66,'change_quiz'),(198,'Can delete quiz',66,'delete_quiz'),(202,'Can add quiz student response',68,'add_quizstudentresponse'),(203,'Can change quiz student response',68,'change_quizstudentresponse'),(204,'Can delete quiz student response',68,'delete_quizstudentresponse'),(205,'Can add quiz student response details',69,'add_quizstudentresponsedetails'),(206,'Can change quiz student response details',69,'change_quizstudentresponsedetails'),(207,'Can delete quiz student response details',69,'delete_quizstudentresponsedetails'),(208,'Can add course forum thread',70,'add_courseforumthread'),(209,'Can change course forum thread',70,'change_courseforumthread'),(210,'Can delete course forum thread',70,'delete_courseforumthread'),(211,'Can add language',71,'add_language'),(212,'Can change language',71,'change_language'),(213,'Can delete language',71,'delete_language'),(214,'Can add country',72,'add_country'),(215,'Can change country',72,'change_country'),(216,'Can delete country',72,'delete_country'),(217,'Can add language',73,'add_language'),(218,'Can change language',73,'change_language'),(219,'Can delete language',73,'delete_language'),(220,'Can add state',74,'add_state'),(221,'Can change state',74,'change_state'),(222,'Can delete state',74,'delete_state'),(223,'Can add region',75,'add_region'),(224,'Can change region',75,'change_region'),(225,'Can delete region',75,'delete_region'),(226,'Can add contact',76,'add_contact'),(227,'Can change contact',76,'change_contact'),(228,'Can delete contact',76,'delete_contact'),(229,'Can add chapter document',77,'add_chapterdocument'),(230,'Can change chapter document',77,'change_chapterdocument'),(231,'Can delete chapter document',77,'delete_chapterdocument'),(232,'Can add chapter quizz',78,'add_chapterquizz'),(233,'Can change chapter quizz',78,'change_chapterquizz'),(234,'Can delete chapter quizz',78,'delete_chapterquizz'),(235,'Can add video document',79,'add_videodocument'),(236,'Can change video document',79,'change_videodocument'),(237,'Can delete video document',79,'delete_videodocument'),(238,'Can add syllabus',80,'add_syllabus'),(239,'Can change syllabus',80,'change_syllabus'),(240,'Can delete syllabus',80,'delete_syllabus'),(241,'Can add quiz question',81,'add_quizquestion'),(242,'Can change quiz question',81,'change_quizquestion'),(243,'Can delete quiz question',81,'delete_quizquestion'),(244,'Can add quiz question response',82,'add_quizquestionresponse'),(245,'Can change quiz question response',82,'change_quizquestionresponse'),(246,'Can delete quiz question response',82,'delete_quizquestionresponse'),(247,'Can add course forum',83,'add_courseforum'),(248,'Can change course forum',83,'change_courseforum'),(249,'Can delete course forum',83,'delete_courseforum'),(250,'Can add collaborator invitation',84,'add_collaboratorinvitation'),(251,'Can change collaborator invitation',84,'change_collaboratorinvitation'),(252,'Can delete collaborator invitation',84,'delete_collaboratorinvitation'),(253,'Can add teacher collaboration team task',85,'add_teachercollaborationteamtask'),(254,'Can change teacher collaboration team task',85,'change_teachercollaborationteamtask'),(255,'Can delete teacher collaboration team task',85,'delete_teachercollaborationteamtask'),(256,'Can add team rules',86,'add_teamrules'),(257,'Can change team rules',86,'change_teamrules'),(258,'Can delete team rules',86,'delete_teamrules');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `ID_client` int(8) NOT NULL,
  `NOM_client` text NOT NULL,
  `PRENOM_client` text NOT NULL,
  `ADRESSE_client` text NOT NULL,
  `EMAIL_client` text NOT NULL,
  `TEL_client` int(8) NOT NULL,
  `REFERENCE_objet` int(8) NOT NULL,
  PRIMARY KEY (`ID_client`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (123456,'ccccc','aaaaa','eljem','cccccc@gmail.com',22548795,501),(587,'hhhhhhh','vvvvv','ggggggg','hhgt@gmail.com',258,658);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments_comment`
--

DROP TABLE IF EXISTS `comments_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `submit_date` datetime NOT NULL,
  `ip_address` char(15) DEFAULT NULL,
  `public` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `content_type_id_refs_id_c8372918` (`content_type_id`),
  KEY `author_id_refs_id_cb01dae9` (`author_id`),
  CONSTRAINT `author_id_refs_id_cb01dae9` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `content_type_id_refs_id_c8372918` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_comment`
--

LOCK TABLES `comments_comment` WRITE;
/*!40000 ALTER TABLE `comments_comment` DISABLE KEYS */;
INSERT INTO `comments_comment` VALUES (1,76,'','','',15,1,'fffffffffff','2014-08-24 05:41:32','127.0.0.1',1),(2,76,'','','',15,1,'fffffffffff','2014-08-24 05:44:23','127.0.0.1',1),(3,76,'','','',15,1,'hu','2014-08-24 06:07:52','127.0.0.1',1),(4,76,'','','',15,1,'dsdsdsdsdsd','2014-08-24 06:11:51','127.0.0.1',1),(5,76,'','','',15,1,'dsdsdsdsdsd','2014-08-24 06:13:36','127.0.0.1',1),(6,76,'','','',15,1,'dsdsdsdsdsd','2014-08-24 06:14:51','127.0.0.1',1),(7,76,'','','',15,1,'dsdsdsdsdsd','2014-08-24 06:16:45','127.0.0.1',1),(8,76,'','','',15,1,'dsds','2014-08-24 06:18:39','127.0.0.1',1),(9,76,'','','',15,1,'dsds','2014-08-24 06:56:39','127.0.0.1',1),(10,76,'','','',15,1,'life is go','2014-08-24 06:57:16','127.0.0.1',1),(11,76,'','','',59,2,'gggggggggggggggg','2014-08-31 03:16:39','127.0.0.1',1),(12,76,'','','',59,2,'alpha\n','2014-09-03 19:52:33','127.0.0.1',1),(13,76,'','','',59,2,'alpha\nqfgfsdggffdg','2014-09-03 19:53:21','127.0.0.1',1),(14,76,'','','',59,2,'alpha\nqfgsdfgfgfsdggffdg','2014-09-03 19:53:25','127.0.0.1',1),(15,76,'','','',15,9,'kkkkkkkkkkkkkkkk','2014-09-03 22:01:59','127.0.0.1',1);
/*!40000 ALTER TABLE `comments_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_contact`
--

DROP TABLE IF EXISTS `company_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(35) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `is_anonymous` tinyint(4) DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `posted_at` date DEFAULT NULL,
  `ip_address` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_contact`
--

LOCK TABLES `company_contact` WRITE;
/*!40000 ALTER TABLE `company_contact` DISABLE KEYS */;
INSERT INTO `company_contact` VALUES (1,'houcem902@live.fr','uuuuuuuuuuuuuuuuuuuuuu','houcem_fat',1,76,'2014-09-05',NULL);
/*!40000 ALTER TABLE `company_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `author_id` int(11) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `about` text,
  `from` date DEFAULT NULL,
  `to` date DEFAULT NULL,
  `views_nbr` int(5) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,76,'سسققبببببفغععهتتتتتتت','','2014-07-27','2014-08-08',1),(2,76,'second','','0000-00-00','0000-00-00',1),(3,76,'nnnnnnnbnb','','2014-10-09','2014-10-09',1),(4,76,'hhhhhhhhhhhhhh','','2013-12-11','2014-01-08',1),(5,10,'ddddddddddddddd','','2014-02-14','2013-02-07',1),(6,10,'sssssssssssss','','0000-00-00','0000-00-00',1),(8,10,'عععغغغغصصقغغخ','','2014-05-03','2014-06-14',0);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_category`
--

DROP TABLE IF EXISTS `course_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_category` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `followers` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_category`
--

LOCK TABLES `course_category` WRITE;
/*!40000 ALTER TABLE `course_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_chapter`
--

DROP TABLE IF EXISTS `course_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_chapter` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `author_id` int(11) unsigned NOT NULL,
  `course_id` int(11) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  `difficulty` int(1) unsigned DEFAULT '0',
  `chapter_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `author_id` (`author_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapter`
--

LOCK TABLES `course_chapter` WRITE;
/*!40000 ALTER TABLE `course_chapter` DISABLE KEYS */;
INSERT INTO `course_chapter` VALUES (1,76,3,'dfjhdjf','dfhsjdhjhfds','2014-08-04 00:00:00',0,NULL),(2,76,3,'sss','sss','2014-08-04 00:00:00',0,NULL),(3,76,3,'xcwc','wcxcwxcwcwxcwxc','2014-08-04 00:00:00',0,NULL),(4,76,3,'chhhhhhhhhhhhhhhhh','chhhhhhhhhh','2014-08-04 00:00:00',0,NULL),(5,76,3,'tthhe h fsdf','w;vnwxcvnw;xcvn;','2014-08-04 00:00:00',1,NULL),(6,76,1,'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','2014-08-04 00:00:00',0,NULL),(7,76,1,'test 3 hfria dhhbd','sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','2014-08-04 00:00:00',0,NULL),(8,76,1,'dddddddddddddddddds','sdsddddddddddddddddddddddddssssssssssssssssssssssssssssssssss','2014-08-04 00:00:00',0,NULL),(9,76,1,'dfdhfkhsdhfskdfqfhl','qsdfkhqdfqsdhfqksdjfhqsdfkh','2014-08-04 00:00:00',0,NULL),(10,76,1,'dfdhfkhsdhfskdfqfhl','qsdfkhqdfqsdhfqksdjfhqsdfkh','2014-08-04 00:00:00',0,NULL),(11,76,1,'dfdhfkhsdhfskdfqfhl','qsdfkhqdfqsdhfqksdjfhqsdfkh','2014-08-04 00:00:00',0,NULL),(12,76,1,'dfdhfkhsdhfskdfqfhl','qsdfkhqdfqsdhfqksdjfhqsdfkh','2014-08-04 00:00:00',0,NULL),(13,76,1,'Me-------------------dsjgjsd  sdsd','dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd','2014-08-04 00:00:00',0,NULL);
/*!40000 ALTER TABLE `course_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_chapter_document`
--

DROP TABLE IF EXISTS `course_chapter_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_chapter_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `document_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `document_id_refs_id_40d0da53` (`document_id`),
  CONSTRAINT `document_id_refs_id_40d0da53` FOREIGN KEY (`document_id`) REFERENCES `course_document` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapter_document`
--

LOCK TABLES `course_chapter_document` WRITE;
/*!40000 ALTER TABLE `course_chapter_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_chapter_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_chapter_quiz`
--

DROP TABLE IF EXISTS `course_chapter_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_chapter_quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quiz_id` (`quiz_id`,`chapter_id`),
  CONSTRAINT `quiz_id_refs_id_f16a139c` FOREIGN KEY (`quiz_id`) REFERENCES `course_quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapter_quiz`
--

LOCK TABLES `course_chapter_quiz` WRITE;
/*!40000 ALTER TABLE `course_chapter_quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_chapter_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_chapter_video`
--

DROP TABLE IF EXISTS `course_chapter_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_chapter_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `script_file` varchar(100) NOT NULL,
  `script_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapter_video`
--

LOCK TABLES `course_chapter_video` WRITE;
/*!40000 ALTER TABLE `course_chapter_video` DISABLE KEYS */;
INSERT INTO `course_chapter_video` VALUES (1,3,76,'myss video','sssssssssssssssssssssssssssssss','C:/WWW/media/houcem902@live.fr/Attestation_participation_Fathallah_houssem.pdf','Attestation_participation_Fathallah_houssem.pdf','http://vjs.zencdn.net/v/oceans.mp4','2014-08-14 20:10:20'),(2,1,76,'my video',NULL,'C:/WWW/media/houcem902@live.fr/CV.docx','CV.docx','http://vjs.zencdn.net/v/oceans.mp4','2014-08-15 09:22:42');
/*!40000 ALTER TABLE `course_chapter_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_chapter_video_document`
--

DROP TABLE IF EXISTS `course_chapter_video_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_chapter_video_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `video_id_refs_id_8feee3ff` (`video_id`),
  KEY `document_id_refs_id_f93bbf12` (`document_id`),
  CONSTRAINT `document_id_refs_id_f93bbf12` FOREIGN KEY (`document_id`) REFERENCES `course_document` (`id`),
  CONSTRAINT `video_id_refs_id_8feee3ff` FOREIGN KEY (`video_id`) REFERENCES `course_chapter_video` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapter_video_document`
--

LOCK TABLES `course_chapter_video_document` WRITE;
/*!40000 ALTER TABLE `course_chapter_video_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_chapter_video_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_document`
--

DROP TABLE IF EXISTS `course_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_refs_id_fe34414b` (`author_id`),
  CONSTRAINT `author_id_refs_id_fe34414b` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_document`
--

LOCK TABLES `course_document` WRITE;
/*!40000 ALTER TABLE `course_document` DISABLE KEYS */;
INSERT INTO `course_document` VALUES (1,76,'svg__.png','','2014-09-04 01:02:52'),(2,76,'svg__.png','','2014-09-04 01:03:23'),(3,76,'svg__.png','C:/WWW/media/houcem902@live.fr/svg__.png','2014-09-04 01:38:14'),(4,76,'github-icon-32.png','C:/WWW/media/houcem902@live.fr/github-icon-32.png','2014-09-04 01:40:13'),(5,76,'svg__.png','C:/WWW/media/houcem902@live.fr/svg___1.png','2014-09-04 01:43:48'),(6,76,'YELLOWSUB.jpg','C:/WWW/media/houcem902@live.fr/YELLOWSUB.jpg','2014-09-04 01:44:21'),(7,76,'YELLOWSUB.jpg','C:/WWW/media/houcem902@live.fr/YELLOWSUB.jpg-0.781668920285','2014-09-04 01:58:37'),(8,76,'svg__.png','C:/WWW/media/houcem902@live.fr/0.882774739855-svg__.png','2014-09-04 02:20:55'),(9,76,'YELLOWSUB.jpg','C:/WWW/media/houcem902@live.fr/0.240693844951-YELLOWSUB.jpg','2014-09-04 02:26:00'),(10,76,'YELLOWSUB.jpg','C:/WWW/media/houcem902@live.fr/0.383232226276-YELLOWSUB.jpg','2014-09-04 02:28:44'),(11,76,'YELLOWSUB.jpg','C:/WWW/media/houcem902@live.fr/0.0187210685933-YELLOWSUB.jpg','2014-09-04 02:38:35'),(12,76,'github-icon-32.png','C:/WWW/media/houcem902@live.fr/0.299673819885-github-icon-32.png','2014-09-04 02:39:04'),(13,76,'svg__.png','C:/WWW/media/houcem902@live.fr/0.0699950170403-svg__.png','2014-09-04 02:39:23'),(14,76,'YELLOWSUB.jpg','C:/WWW/media/houcem902@live.fr/0.511664508908-YELLOWSUB.jpg','2014-09-04 02:42:08'),(15,76,'svg__.png','C:/WWW/media/houcem902@live.fr/0.866527735337-svg__.png','2014-09-04 07:28:52'),(16,76,'github-icon-32.png','C:/WWW/media/houcem902@live.fr/0.518968033224-github-icon-32.png','2014-09-04 08:07:56'),(17,76,'download.png','C:/WWW/media/houcem902@live.fr/0.894871338686-download.png','2014-09-04 09:00:10'),(18,76,'midooo.png','C:/WWW/media/houcem902@live.fr/0.3410846205-midooo.png','2014-09-04 09:00:36'),(19,76,'midooo.png','C:/WWW/media/houcem902@live.fr/0.465259885391-midooo.png','2014-09-04 09:05:51'),(20,76,'midooo.png','C:/WWW/media/houcem902@live.fr/0.90672349821-midooo.png','2014-09-04 09:08:40'),(21,76,'midooo.png','C:/WWW/media/houcem902@live.fr/0.389616788796-midooo.png','2014-09-04 17:22:20');
/*!40000 ALTER TABLE `course_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_forum`
--

DROP TABLE IF EXISTS `course_forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_forum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` longtext NOT NULL,
  `description` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_refs_id_1f979000` (`author_id`),
  CONSTRAINT `author_id_refs_id_1f979000` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_forum`
--

LOCK TABLES `course_forum` WRITE;
/*!40000 ALTER TABLE `course_forum` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_forum_thread`
--

DROP TABLE IF EXISTS `course_forum_thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_forum_thread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `votes_nbr` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_forum_thread_f979685d` (`topic_id`),
  KEY `course_forum_thread_e969df21` (`author_id`),
  CONSTRAINT `author_id_refs_id_ecf23937` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `topic_id_refs_id_85c81c9e` FOREIGN KEY (`topic_id`) REFERENCES `course_forum` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_forum_thread`
--

LOCK TABLES `course_forum_thread` WRITE;
/*!40000 ALTER TABLE `course_forum_thread` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_forum_thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_level`
--

DROP TABLE IF EXISTS `course_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_level` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_level`
--

LOCK TABLES `course_level` WRITE;
/*!40000 ALTER TABLE `course_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_quiz`
--

DROP TABLE IF EXISTS `course_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `released` tinyint(1) NOT NULL,
  `about` longtext NOT NULL,
  `created` datetime NOT NULL,
  `is_timed` tinyint(1) NOT NULL,
  `time` int(11) NOT NULL,
  `last_updated` datetime NOT NULL,
  `note` int(11) NOT NULL,
  `max_attemps` int(11) NOT NULL,
  `display_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_quiz`
--

LOCK TABLES `course_quiz` WRITE;
/*!40000 ALTER TABLE `course_quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_quiz_question`
--

DROP TABLE IF EXISTS `course_quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_quiz_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `respnse_explanation` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `order` int(11) NOT NULL,
  `note` int(11) NOT NULL,
  `max_attemps` int(11) NOT NULL,
  `quiz_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id_refs_id_e8bdf1c5` (`quiz_id`),
  KEY `author_id_refs_id_84528405` (`author_id`),
  CONSTRAINT `author_id_refs_id_84528405` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `quiz_id_refs_id_e8bdf1c5` FOREIGN KEY (`quiz_id`) REFERENCES `course_quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_quiz_question`
--

LOCK TABLES `course_quiz_question` WRITE;
/*!40000 ALTER TABLE `course_quiz_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_quiz_question_response`
--

DROP TABLE IF EXISTS `course_quiz_question_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_quiz_question_response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `is_true` tinyint(1) NOT NULL,
  `order` int(11) NOT NULL,
  `_order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_refs_id_3c6964d7` (`author_id`),
  KEY `question_id_refs_id_b24d1f3f` (`question_id`),
  CONSTRAINT `author_id_refs_id_3c6964d7` FOREIGN KEY (`author_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `question_id_refs_id_b24d1f3f` FOREIGN KEY (`question_id`) REFERENCES `course_quiz_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_quiz_question_response`
--

LOCK TABLES `course_quiz_question_response` WRITE;
/*!40000 ALTER TABLE `course_quiz_question_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_quiz_question_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_quiz_student_response`
--

DROP TABLE IF EXISTS `course_quiz_student_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_quiz_student_response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_question_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_question_id_refs_id_5f2744ac` (`quiz_question_id`),
  KEY `student_id_refs_id_bf8b974e` (`student_id`),
  CONSTRAINT `quiz_question_id_refs_id_5f2744ac` FOREIGN KEY (`quiz_question_id`) REFERENCES `course_quiz` (`id`),
  CONSTRAINT `student_id_refs_id_bf8b974e` FOREIGN KEY (`student_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_quiz_student_response`
--

LOCK TABLES `course_quiz_student_response` WRITE;
/*!40000 ALTER TABLE `course_quiz_student_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_quiz_student_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_quiz_student_response_details`
--

DROP TABLE IF EXISTS `course_quiz_student_response_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_quiz_student_response_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_response_id` int(11) NOT NULL,
  `details` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_response_id_refs_id_d5017dfc` (`quiz_response_id`),
  CONSTRAINT `quiz_response_id_refs_id_d5017dfc` FOREIGN KEY (`quiz_response_id`) REFERENCES `course_quiz_student_response` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_quiz_student_response_details`
--

LOCK TABLES `course_quiz_student_response_details` WRITE;
/*!40000 ALTER TABLE `course_quiz_student_response_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_quiz_student_response_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_subscriber`
--

DROP TABLE IF EXISTS `course_subscriber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_subscriber` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_subscriber`
--

LOCK TABLES `course_subscriber` WRITE;
/*!40000 ALTER TABLE `course_subscriber` DISABLE KEYS */;
INSERT INTO `course_subscriber` VALUES (53,3,3),(54,5,10),(55,2,10),(56,1,10),(57,6,10),(58,3,76),(59,350,13),(60,150,14),(61,150,14),(62,150,14),(63,4,10);
/*!40000 ALTER TABLE `course_subscriber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_syllabus`
--

DROP TABLE IF EXISTS `course_syllabus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_syllabus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `about` longtext NOT NULL,
  `created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_syllabus`
--

LOCK TABLES `course_syllabus` WRITE;
/*!40000 ALTER TABLE `course_syllabus` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_syllabus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `content_type_id_refs_id_93d2d1f8` (`content_type_id`),
  KEY `user_id_refs_id_b7cc0415` (`user_id`),
  CONSTRAINT `content_type_id_refs_id_93d2d1f8` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `user_id_refs_id_b7cc0415` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_label` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'permission','auth','permission'),(2,'group','auth','group'),(3,'content type','contenttypes','contenttype'),(4,'session','sessions','session'),(5,'site','sites','site'),(6,'log entry','admin','logentry'),(8,'email address','accounts','emailaddress'),(9,'email confirmation','accounts','emailconfirmation'),(10,'professor profile','professor','professorprofile'),(11,'professor web link','professor','professorweblink'),(12,'professor privacy','professor','professorprivacy'),(13,'professor message','professor','professormessage'),(14,'student profile','student','studentprofile'),(15,'chapter','chapters','chapter'),(19,'country','system','country'),(20,'state','system','state'),(21,'region','system','region'),(22,'contact','system','contact'),(23,'category','courses','category'),(24,'course','courses','course'),(27,'level','courses','level'),(28,'profile','accounts','profile'),(29,'student','accounts','student'),(30,'teacher','accounts','teacher'),(34,'lang','system','lang'),(35,'course subscriber','courses','coursesubscriber'),(36,'team','collaborators','team'),(37,'team member ship','collaborators','teammembership'),(38,'team member rules','collaborators','teammemberrules'),(43,'notification','notifications','notification'),(44,'message','inbox','message'),(51,'teacher collaboration task','tasks','teachercollaborationtask'),(53,'collaborator','collaboration','collaborator'),(54,'team','teams','team'),(55,'team member ship','teams','teammembership'),(59,'video','videos','video'),(61,'comment','comments','comment'),(62,'user','accounts','user'),(63,'teacher profile','accounts','teacherprofile'),(64,'teacher privacy','accounts','teacherprivacy'),(65,'document','documents','document'),(66,'quiz','quizzes','quiz'),(68,'quiz student response','quizzes','quizstudentresponse'),(69,'quiz student response details','quizzes','quizstudentresponsedetails'),(70,'course forum thread','forum','courseforumthread'),(71,'language','system','language'),(72,'country','public','country'),(73,'language','public','language'),(74,'state','public','state'),(75,'region','public','region'),(76,'contact','company','contact'),(77,'chapter document','chapters','chapterdocument'),(78,'chapter quizz','chapters','chapterquizz'),(79,'video document','videos','videodocument'),(80,'syllabus','syllabuses','syllabus'),(81,'quiz question','quizzes','quizquestion'),(82,'quiz question response','quizzes','quizquestionresponse'),(83,'course forum','forum','courseforum'),(84,'collaborator invitation','collaboration','collaboratorinvitation'),(85,'teacher collaboration team task','teams','teachercollaborationteamtask'),(86,'team rules','teams','teamrules');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0giueugk6g9fnajlpmi2ffk44hxwpbk7','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 19:47:32'),('0jjwg1nj8r3okxxqs3infvmt2zpdv38p','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 01:57:51'),('0tdiib84ggrgkt091xszzh3kzsbviovm','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-09 10:55:31'),('2yotkicvuu4na3y6b6vt50fom9dph4jc','MzE5YzlhZTJmNjBjZDY2NmE4NDBiODczMDkwYWE1M2Q5MzQxZTYzNjqAAn1xAShYDwAAAF9zZXNzaW9uX2V4cGlyeXECSwBVEl9hdXRoX3VzZXJfYmFja2VuZHEDVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEEVQ9kamFuZ29fbGFuZ3VhZ2VYAgAAAGFyVQ1fYXV0aF91c2VyX2lkcQWKAUx1Lg==','2014-07-16 23:17:57'),('3eo1fhei0m9cx5xx9dmoestlib9sn3fy','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:06:49'),('3fgtd1ijtyf64373yxjt8vgtdpr0wr7n','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 22:39:05'),('3occk44v7nidah6uxwqwka0qjqarken4','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:22:24'),('3p8ygkbzp8jnvyn4owiy7bstg3u9s0ux','ZDg1NTYwNzRlY2I5ZjE2MDNmODI3YmU0MGUxNGJiYjk1MGMwMWRhNTqAAn1xAShVDV9hdXRoX3VzZXJfaWSKAUxVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmRYDwAAAF9zZXNzaW9uX2V4cGlyeUsAVQ9kamFuZ29fbGFuZ3VhZ2VYAgAAAGZycQJ1Lg==','2014-07-01 13:13:00'),('4b6e8hqx7sf9w6itggm575m5xvi0c1d3','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 02:02:02'),('4k9drnk25w9pkvvepyre8a615p3jflb9','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 19:48:11'),('5l7w6q4y5m2ijtzpafxahel8dtn308qo','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-09 10:54:35'),('5njtcs1pn4q7lood7f7nvwr3emulnwwf','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 01:09:46'),('6h48g0mgy0zsbzkza270vj27a2c39ona','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 23:32:12'),('7emij4bqgiem51euciszcng9y8q1mcz9','NzlhMmE5MzRmOTNlMTFiNmMwZWIyMGU1Y2E0NDg1MDVlZTQ0NGNhZDqAAn1xAVUPZGphbmdvX2xhbmd1YWdlVQJhcnECcy4=','2014-06-12 16:44:50'),('7ep0ge7va4bsd09d6o7nxiizs684vwji','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 01:31:39'),('7jto6b1b3en2d9b88f7lh88f7ccb2xht','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 15:45:51'),('8ueeqpeedcjj0bd07kxte8w54pgjac34','M2JkMmQwMTYwZmY1OGYxZTgyNTM3MjhmZjc5ZDQ2MWVkMDY0YTk4ZjqAAn1xAShVEnBob25lX3ZlcmlmaWNhdGlvbko+GMsFVRZhY2NvdW50X3ZlcmlmaWVkX2VtYWlsTnUu','2014-06-13 13:39:26'),('9icykn91lgntxx025wbhpgj57qy1gjk2','MGE5ZTc2ZjgzMThlMTkzMjQ2NDQ5MDczOWUwMjlmYjA1ZTAzMDAyMDqAAn1xAVUWYWNjb3VudF92ZXJpZmllZF9lbWFpbE5zLg==','2014-06-13 21:03:36'),('a7hd9tx2zdzigmuei8zqe48g0m7wu5rl','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:05:58'),('ayhcsf9z0s1yjc4zbj118siuv8yyjqqh','OTRjYjkyZjc0Nzk2Mjg3MzgyZDMwZGUyZjNhZGE3Y2Q4ZTBmZTJhMTqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAUx1Lg==','2014-06-14 15:30:58'),('ccl70tfmjzf2w66kz20dixxm7qh9tvtf','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:01:05'),('cllbnbh9y33ff95loe8llzouvolbqy2x','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:05:40'),('d1mz6pupmwb83k736vst7expopzt8wko','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 15:46:03'),('d4sjrl7htjh6d5qgv6twetr32f2vrwwt','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 15:42:28'),('ddyn2bf3beppidvdqdwuww12zzweu41x','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:27:06'),('dly3jpum2banqvgib9ix3siacewdze0k','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 01:30:54'),('ehxol9m2sj42kmc7gm6qct8k9xlwu3i1','YzJhZDQ4YWE2MmJlM2YzNDYyZWY5ODA4MTYzMzdmY2FkNjNmYmRkOTqAAn1xAShVEnBob25lX3ZlcmlmaWNhdGlvbnECSlEk1QVVFmFjY291bnRfdmVyaWZpZWRfZW1haWxxA051Lg==','2014-06-13 00:59:17'),('fcquvwz9cwb7fw9jcfovtp9y48q287pv','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 15:58:19'),('gpyz0iyudxboim6qe1kamoe0nwjztogj','NTJkODE4MDZkZDZhMWYzZjMzYjk4YzVkNWZiZWZlNGM0MjIyN2JjYzqAAn1xAShVDV9hdXRoX3VzZXJfaWSKAUxVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmRYDwAAAF9zZXNzaW9uX2V4cGlyeUsAVQ9kamFuZ29fbGFuZ3VhZ2VxAlgCAAAAYXJxA3Uu','2014-08-23 00:00:51'),('gu7ir4v4hx14t0x1jl6d43d877o49qfo','Njk3ZmFmMWY3ZTQ2NmE5YzM5MGUzZTdiYTc5ZjU2MDFkNmUxZjAyYjqAAn1xAVUPZGphbmdvX2xhbmd1YWdlWAIAAABhcnECcy4=','2014-06-26 00:17:14'),('jbnfbgxwogcwutgiuctfau92knggd1t7','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 23:27:29'),('k72pg8z7bfa5y4ibvvk0stxjtmw5fgv7','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 02:02:41'),('lvfbhw5qwl6mhkewudp7p6gewv42vtz9','OTRjYjkyZjc0Nzk2Mjg3MzgyZDMwZGUyZjNhZGE3Y2Q4ZTBmZTJhMTqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAUx1Lg==','2014-06-14 21:01:10'),('mk5gqrxzdqs7y24cskor74ejo7s5dabz','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 01:36:50'),('mlzwscbst1faps6zj73jk1ilofjxyt5z','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-06-26 02:01:16'),('nyqoxw7t7nmig1gqkhmvqo70dktrq968','NTk0ZmY5NTI4ODBmYjJkYzQyZWE1YWM4YWUyMDdjNjc5MDlmMGEzNzqAAn1xAShVD2RqYW5nb19sYW5ndWFnZVUCZnJVFmFjY291bnRfdmVyaWZpZWRfZW1haWxOdS4=','2014-06-12 23:34:15'),('p3wajnua9w2j58808eiiivxuo6nvi03v','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 15:46:30'),('pjdfgojcyadoy5j70wxzfd4uk7ywghmy','NTJkODE4MDZkZDZhMWYzZjMzYjk4YzVkNWZiZWZlNGM0MjIyN2JjYzqAAn1xAShVDV9hdXRoX3VzZXJfaWSKAUxVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmRYDwAAAF9zZXNzaW9uX2V4cGlyeUsAVQ9kamFuZ29fbGFuZ3VhZ2VxAlgCAAAAYXJxA3Uu','2014-09-11 11:15:31'),('qri2thbejcppo01yzaqc208nssa8uagg','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-05-25 22:07:22'),('qvnci9x29yngf1eap89ylfcs2p1hlz74','MzE5YzlhZTJmNjBjZDY2NmE4NDBiODczMDkwYWE1M2Q5MzQxZTYzNjqAAn1xAShYDwAAAF9zZXNzaW9uX2V4cGlyeXECSwBVEl9hdXRoX3VzZXJfYmFja2VuZHEDVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEEVQ9kamFuZ29fbGFuZ3VhZ2VYAgAAAGFyVQ1fYXV0aF91c2VyX2lkcQWKAUx1Lg==','2014-08-17 15:47:43'),('sue6ofb0k8cx274vi6xpc8myy4yebsy1','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:02:46'),('t5rtqrompb6woet474dod2hjfg7akg10','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 23:33:09'),('tjkrk7slrszfuxeoe9y3xz33zd1lqyub','OTRjYjkyZjc0Nzk2Mjg3MzgyZDMwZGUyZjNhZGE3Y2Q4ZTBmZTJhMTqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAUx1Lg==','2014-06-14 01:01:38'),('u1d8n78cdyj9ft6oqmwmu6xfd5jv4yqd','ZDA3NjE2ODA1NjBiM2NiMjhmZmEyYzMxZTJiNjY0Njg4OGViMjVjNDqAAn1xAS4=','2014-09-05 16:00:50'),('v30shx16bgpi5oz4n9zxld0tmu1f7zyi','NTJkODE4MDZkZDZhMWYzZjMzYjk4YzVkNWZiZWZlNGM0MjIyN2JjYzqAAn1xAShVDV9hdXRoX3VzZXJfaWSKAUxVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmRYDwAAAF9zZXNzaW9uX2V4cGlyeUsAVQ9kamFuZ29fbGFuZ3VhZ2VxAlgCAAAAYXJxA3Uu','2014-08-08 02:42:22'),('xmvhls688d7e66hxpkwuk2qg77shj9r0','Njk3ZmFmMWY3ZTQ2NmE5YzM5MGUzZTdiYTc5ZjU2MDFkNmUxZjAyYjqAAn1xAVUPZGphbmdvX2xhbmd1YWdlWAIAAABhcnECcy4=','2014-06-21 22:04:39'),('y3bcjfa7lp5jrput6sffk86t7x6uzawe','NzExNzQ3ZTJhZDI5NTk5NGMyZTQ0NTc1NjA2ZmYxZTE2YzBiMTVjYzqAAn1xAVUPZGphbmdvX2xhbmd1YWdlWAIAAABlbnECcy4=','2014-06-19 15:46:23'),('yzafqfr0bj939kx15s4dqmff8hw6awxk','N2MzNTliZjVlM2NjOTE4YzU2NGY0OTMwNDg1YzU4MWRiODJlNGQxMDqAAn1xAShVDV9hdXRoX3VzZXJfaWSKAUxVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmRYDwAAAF9zZXNzaW9uX2V4cGlyeUsAVQ9kamFuZ29fbGFuZ3VhZ2VYAgAAAGFycQJ1Lg==','2014-07-06 10:29:12'),('z2whrh6zbesuthgtx1tiur4mk9mps4a2','MGE5ZTc2ZjgzMThlMTkzMjQ2NDQ5MDczOWUwMjlmYjA1ZTAzMDAyMDqAAn1xAVUWYWNjb3VudF92ZXJpZmllZF9lbWFpbE5zLg==','2014-06-11 22:06:04'),('zzc0phky5fybhyf89yxs3fonsln7pqw2','Njk3ZmFmMWY3ZTQ2NmE5YzM5MGUzZTdiYTc5ZjU2MDFkNmUxZjAyYjqAAn1xAVUPZGphbmdvX2xhbmd1YWdlWAIAAABhcnECcy4=','2014-06-21 22:23:36');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'meem.com','MeeM');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `send_id` int(11) NOT NULL,
  `reciever_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitations`
--

LOCK TABLES `invitations` WRITE;
/*!40000 ALTER TABLE `invitations` DISABLE KEYS */;
INSERT INTO `invitations` VALUES (1,10,'text1'),(2,10,'text2'),(3,10,'houssem@gmail.com'),(4,10,'hhh@dd.tn'),(5,10,'houssem@gmail.codm'),(6,10,'fdfdf@sqvqvf.fr'),(7,10,'hou@li.gt');
/*!40000 ALTER TABLE `invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `message` text NOT NULL,
  `new` tinyint(4) NOT NULL DEFAULT '1',
  `type` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `public_country`
--

DROP TABLE IF EXISTS `public_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `public_country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iso_code` varchar(2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `local_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iso_code` (`iso_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public_country`
--

LOCK TABLES `public_country` WRITE;
/*!40000 ALTER TABLE `public_country` DISABLE KEYS */;
/*!40000 ALTER TABLE `public_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `public_language`
--

DROP TABLE IF EXISTS `public_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `public_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) NOT NULL,
  `value` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public_language`
--

LOCK TABLES `public_language` WRITE;
/*!40000 ALTER TABLE `public_language` DISABLE KEYS */;
/*!40000 ALTER TABLE `public_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `public_region`
--

DROP TABLE IF EXISTS `public_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `public_region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id_refs_id_2ce3b2fd` (`state_id`),
  CONSTRAINT `state_id_refs_id_2ce3b2fd` FOREIGN KEY (`state_id`) REFERENCES `public_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public_region`
--

LOCK TABLES `public_region` WRITE;
/*!40000 ALTER TABLE `public_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `public_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `public_state`
--

DROP TABLE IF EXISTS `public_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `public_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `country_id_refs_id_828e0425` (`country_id`),
  CONSTRAINT `country_id_refs_id_828e0425` FOREIGN KEY (`country_id`) REFERENCES `public_country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public_state`
--

LOCK TABLES `public_state` WRITE;
/*!40000 ALTER TABLE `public_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `public_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `user_id` int(11) NOT NULL,
  `level` varchar(2) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id_refs_id_a6e026d7` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (76,'0',13);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `cin` int(9) unsigned NOT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `account_type` tinyint(2) NOT NULL,
  `created_date` date NOT NULL,
  `verification_code` varchar(255) NOT NULL,
  `verification_expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (38,76,787144545,0,3,'2014-01-23','cf2194524c44eefba05867f6bef0726a23ada912','2014-01-23 14:57:04'),(42,82,0,0,0,'0000-00-00','',NULL);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_collaborator`
--

DROP TABLE IF EXISTS `teacher_collaboration_collaborator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_collaborator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `join_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_collaborator`
--

LOCK TABLES `teacher_collaboration_collaborator` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_collaborator` DISABLE KEYS */;
INSERT INTO `teacher_collaboration_collaborator` VALUES (1,76,1,'2014-09-01 14:20:12'),(2,76,3,'2014-09-01 21:52:21');
/*!40000 ALTER TABLE `teacher_collaboration_collaborator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_collaborator_invitation`
--

DROP TABLE IF EXISTS `teacher_collaboration_collaborator_invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_collaborator_invitation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `usermail` varchar(75) NOT NULL,
  `sent_at` datetime NOT NULL,
  `accepted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_id_refs_id_0985caa0` (`source_id`),
  CONSTRAINT `source_id_refs_id_0985caa0` FOREIGN KEY (`source_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_collaborator_invitation`
--

LOCK TABLES `teacher_collaboration_collaborator_invitation` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_collaborator_invitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_collaboration_collaborator_invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_rules`
--

DROP TABLE IF EXISTS `teacher_collaboration_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `rule` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id_refs_id_c0e81c01` (`team_id`),
  CONSTRAINT `team_id_refs_id_c0e81c01` FOREIGN KEY (`team_id`) REFERENCES `teacher_collaboration_team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_rules`
--

LOCK TABLES `teacher_collaboration_rules` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_collaboration_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_task`
--

DROP TABLE IF EXISTS `teacher_collaboration_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `color` varchar(6) NOT NULL,
  `progress` int(10) unsigned NOT NULL,
  `state` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_collaboration_task_ad376f8d` (`user_id`),
  CONSTRAINT `user_id_refs_id_d36fea57` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_task`
--

LOCK TABLES `teacher_collaboration_task` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_task` DISABLE KEYS */;
INSERT INTO `teacher_collaboration_task` VALUES (1,'my event',76,'2014-08-05 04:20:34','2014-08-05 04:20:34','2014-08-05 04:20:34','47a447',0,'S'),(2,'houssem',76,'2014-08-05 04:21:48','2014-08-02 09:21:48','2014-08-02 09:21:48','22d',0,'S'),(3,'my event',76,'2014-08-05 04:24:05','2014-08-03 14:24:05','2014-08-03 14:24:05','2322d',0,'S'),(4,'',76,'2014-08-06 15:50:52','2014-08-06 15:50:01','2014-08-06 15:47:05','',0,'S'),(5,'create',76,'2014-08-06 17:05:52','2014-08-06 17:04:29','2014-08-06 17:04:29','d2322d',0,'S'),(6,'bbbbbbbbbbbbbbbbb',76,'2014-08-06 17:06:44','2014-08-06 17:04:29','2014-08-06 17:04:29','ed9c28',0,'S'),(7,'create',76,'2014-08-06 17:07:25','2014-08-06 17:04:29','2014-08-06 17:04:29','9b3d7',0,'S'),(8,'create',76,'2014-08-06 17:08:24','2014-08-05 22:04:29','2014-08-05 22:04:29','b3d7',0,'S'),(9,'create',76,'2014-08-06 17:09:51','2014-08-04 22:04:29','2014-08-04 22:04:29','ed9c28',0,'S'),(10,'gggggggggggg',76,'2014-08-30 07:31:21','2014-07-28 05:00:00','2014-07-27 05:00:00','d2322d',0,'S'),(11,'my task',76,'2014-08-30 14:15:52','2014-08-04 05:00:00','2014-08-03 05:00:00','2322d',0,'S');
/*!40000 ALTER TABLE `teacher_collaboration_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_team`
--

DROP TABLE IF EXISTS `teacher_collaboration_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_team` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_id_refs_id_8ea403ae` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_team`
--

LOCK TABLES `teacher_collaboration_team` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_team` DISABLE KEYS */;
INSERT INTO `teacher_collaboration_team` VALUES (0,76,'STAFF','2014-09-01');
/*!40000 ALTER TABLE `teacher_collaboration_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_team_membership`
--

DROP TABLE IF EXISTS `teacher_collaboration_team_membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_team_membership` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `collaborator_id` int(11) NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `joined_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id_refs_id_9cd0b5eb` (`team_id`),
  KEY `collaborator_id_refs_id_131c5663` (`collaborator_id`),
  CONSTRAINT `collaborator_id_refs_id_131c5663` FOREIGN KEY (`collaborator_id`) REFERENCES `teacher_collaboration_collaborator` (`id`),
  CONSTRAINT `team_id_refs_id_9cd0b5eb` FOREIGN KEY (`team_id`) REFERENCES `teacher_collaboration_team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_team_membership`
--

LOCK TABLES `teacher_collaboration_team_membership` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_team_membership` DISABLE KEYS */;
INSERT INTO `teacher_collaboration_team_membership` VALUES (9,0,2,1,'2014-09-02'),(12,0,1,1,'2014-09-02');
/*!40000 ALTER TABLE `teacher_collaboration_team_membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_collaboration_team_task`
--

DROP TABLE IF EXISTS `teacher_collaboration_team_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_collaboration_team_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `join_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `task_id_refs_id_edc39ee5` (`task_id`),
  KEY `team_id_refs_id_a5c6a697` (`team_id`),
  CONSTRAINT `task_id_refs_id_edc39ee5` FOREIGN KEY (`task_id`) REFERENCES `teacher_collaboration_task` (`id`),
  CONSTRAINT `team_id_refs_id_a5c6a697` FOREIGN KEY (`team_id`) REFERENCES `teacher_collaboration_team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_collaboration_team_task`
--

LOCK TABLES `teacher_collaboration_team_task` WRITE;
/*!40000 ALTER TABLE `teacher_collaboration_team_task` DISABLE KEYS */;
INSERT INTO `teacher_collaboration_team_task` VALUES (1,10,0,'0000-00-00 00:00:00'),(2,3,0,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `teacher_collaboration_team_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_pofile`
--

DROP TABLE IF EXISTS `teacher_pofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_pofile` (
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_pofile`
--

LOCK TABLES `teacher_pofile` WRITE;
/*!40000 ALTER TABLE `teacher_pofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_pofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_privacy`
--

DROP TABLE IF EXISTS `teacher_privacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_privacy` (
  `user_id` int(11) NOT NULL,
  `is_phone_public` tinyint(1) NOT NULL,
  `is_adresse_public` tinyint(1) NOT NULL,
  `is_msg_comment` tinyint(1) NOT NULL,
  `is_msg_book` tinyint(1) NOT NULL,
  `is_msg_author_event` tinyint(1) NOT NULL,
  `is_msg_follower_event` tinyint(1) NOT NULL,
  `is_msg_user_follow` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id_refs_id_6c240eee` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_privacy`
--

LOCK TABLES `teacher_privacy` WRITE;
/*!40000 ALTER TABLE `teacher_privacy` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_privacy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-09-10 11:00:13
