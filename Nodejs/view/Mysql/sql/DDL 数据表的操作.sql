#查看所有表
SHOW TABLES;

#新建表
CREATE TABLE IF NOT EXISTS `students`(
	`name` VARCHAR(10),
	`age` int,
	`score` int,
	`date` YEAR,
	
);

#删除比爱哦
DROP TABLE  IF EXISTS `students`

#查看表的结构
DESC users;
SHOW CREATE TABLE `students`

CREATE TABLE `students` (
  `name` varchar(10) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `score` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--创建一个完整的表语法
 CREATE TABLE IF NOT EXISTS `students` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`age` INT DEFAULT 0,
	`phoneNum` VARCHAR(20) UNIQUE DEFAULT '',
	`createTime` TIMESTAMP
 )
--  修改表
-- 修改表的名字
ALTER TABLE `users` RENAME TO `user`;
-- 添加一个新的列
ALTER TABLE `students` ADD `updataTime` TIMESTAMP;
-- 修改字段名称、
ALTER TABLE `students` CHANGE `phoneNum` `telPhone` VARCHAR(20);
-- 修改字段的类型
ALTER TABLE `students` MODIFY `name` VARCHAR(30);
-- 删除一个字段
ALTER TABLE `students` DROP `age`;
-- 根据一个表结构创建另外一个表
CREATE TABLE `users` LIKE `user`
-- 根据另外一个表中的所有内容 创建另外一个表
CREATE TABLE `users2` (SELECT * FROM `user`)

ALTER TABLE `user` ADD `id` INT;

CREATE TABLE IF NOT EXISTS `products`(
		id INT PRIMARY KEY AUTO_INCREMENT,
		brand VARCHAR(20),
		title VARCHAR(100) NOT NULL,
		price DOUBLE NOT NULL,
		score DECIMAL (2,1),
		url VARCHAR(100),
		pid INT
)















