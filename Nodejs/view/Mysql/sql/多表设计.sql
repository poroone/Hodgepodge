CREATE TABLE IF NOT EXISTS `brand`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL, 
	website VARCHAR(100),
	phoneRank INT

)

ALTER TABLE 
INSERT INTO `brand` (name,website,phoneRank) VALUES ("华为","www.huawei.com",2);
INSERT INTO `brand` (name,website,phoneRank) VALUES ("苹果","www.apple.com",10);
INSERT INTO `brand` (name,website,phoneRank) VALUES ("小米","www.mi.com",5);
INSERT INTO `brand` (name,website,phoneRank) VALUES ("oppo","www.oppo.com",12);
INSERT INTO `brand` (name,website,phoneRank) VALUES ("一加","www.一加.com",8);
INSERT INTO `brand` (name,website,phoneRank) VALUES ("淘宝","www.tabao.com",2);

# 设置外键 
-- 给products设置引用brand中的id的外键约束
-- 1.创建时进行设置
CREATE TABLE IF NOT EXISTS `users`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand_id INT,
-- 	//当前的表的brand_id 受到外键brand中的is约束
	FOREIGN KEY(brand_id) REFERENCES brand(id) 
) 
-- 2添加`brand_id字段
ALTER TABLE `products` ADD `brand_id` INT
ALTER TABLE `products` DROP `brand_id` INT
-- 修改brand_id为外键
ALTER TABLE `products` ADD FOREIGN KEY(brand_id) REFERENCES brand(id);

-- 设置brand_id的值
UPDATE `products` SET brand_id="1" WHERE brand="华为";
UPDATE `products` SET brand_id="4" WHERE brand="小米";
UPDATE `products` SET brand_id="3" WHERE brand="苹果";
UPDATE `products` SET brand_id="5" WHERE brand="oppo";
UPDATE `products` SET brand_id="6" WHERE brand="一加";

-- 修改和删除外键引用的is
UPDATE `brand` SET id =1000 WHERE id=1

-- 修改brand_id关联外键是的action
#1.获取到目前的外键名称
SHOW CREATE TABLE `products`

-- CREATE TABLE `products` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `brand` varchar(20) DEFAULT NULL,
--   `title` varchar(100) NOT NULL,
--   `price` double NOT NULL,
--   `score` decimal(2,1) DEFAULT NULL,
--   `url` varchar(100) DEFAULT NULL,
--   `pid` int DEFAULT NULL,
--   `voteCnt` int DEFAULT NULL,
--   `brand_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `brand_id` (`brand_id`),
-- 外键和外键名称`products_ibfk_1`
--   CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

#2.根据名称将外键删除
ALTER TABLE `products` DROP FOREIGN KEY products_ibfk_1;

#3.重新添加外键元素 添加一个外键key是brand_id 关联的外键是 brend中的id 更新的时候是cascade(就是外键跟随一起更新) 删除的时候是默认的RESTRICT不允许
ALTER TABLE `products` ADD FOREIGN KEY(brand_id) REFERENCES brand(id) ON UPDATE CASCADE ON DELETE RESTRICT;