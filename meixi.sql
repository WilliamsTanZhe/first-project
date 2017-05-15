/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : meixi

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-05-15 11:33:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `indexid` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(22) NOT NULL,
  `username` varchar(22) DEFAULT NULL,
  `password` varchar(12) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`indexid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '18878551143', '管理员', '123456', '13@qq.com');
INSERT INTO `account` VALUES ('2', '13977489900', 'williams', '111111', '139@..com');
INSERT INTO `account` VALUES ('4', '13977480099', null, '111111', null);
INSERT INTO `account` VALUES ('7', '17878551143', null, '111111', null);

-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class` varchar(25) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('HTML-1701', '1', 'TOM');
INSERT INTO `class` VALUES ('HTML-1702', '2', 'SAM');
