# 数据查询语句
CREATE TABLE IF NOT EXISTS `products`(
		id INT PRIMARY KEY AUTO_INCREMENT,
		brand VARCHAR(20),
		title VARCHAR(100) NOT NULL,
		price DOUBLE NOT NULL,
		score DECIMAL(2,1),
		url VARCHAR(100),
		pid INT
)

ALTER TABLE `products` ADD `voteCnt` INT;

-- 基本查询 
-- 查询表中所有的字段以及数据
SELECT * FROM `products`
# 查询指定的字段
SELECT title,price FROM `products` 
# 对字段结果起一个别名
SELECT title as poneTitle ,price as currentPrice FROM `products`  

# where条件查询
-- 查询价格小于1000的手机

SELECT title,price FROM `products` WHERE price < 1000;
-- 查询价格等于999的手机
SELECT * FROM `products` WHERE price = 999;
-- 查询价格不等于999的手机
SELECT * FROM `products` WHERE price != 999;
SELECT * FROM `products` WHERE price <> 999;
-- 查询所有的 
SELECT * FROM `products` WHERE brand ="华为";

# 逻辑运算语句
SELECT * FROM `products` WHERE price >1000 AND price <2000;
SELECT * FROM `products` WHERE price >1000 AND && <2000;
-- 包含等于的
SELECT * FROM `products` WHERE price  BETWEEN 1000 AND 2000;
-- 价格在5000以上 或者是华为手机
SELECT * FROM `products` WHERE price > 5000 || brand = "华为";
SELECT * FROM `products` WHERE price > 5000 or brand != "华为";

-- 将某些值设置为null
UPDATE `products` SET url= null WHERE id BETWEEN 15 AND 18
-- 查询某一个值为null 
SELECT * FROM `products` WHERE url IS NULL
-- 查询某一个值不为null 
SELECT * FROM `products` WHERE url IS NOT NULL
 
-- 模糊查询
-- & 匹配任意个数的任意值
SELECT * FROM `products` WHERE title LIKE '%为%'
-- _ 匹配一个任意值
SELECT * FROM `products` WHERE title LIKE '_为%'

-- IN 表示取多个值中的其中一个即可
SELECT * FROM `products` WHERE brand IN("华为","小米","苹果")

# 排序
-- 结果 ASC升序 DESC降序
SELECT * FROM `products` WHERE brand IN("华为","小米","苹果") ORDER BY price ASC,id DESC;

# 分页查询
-- LIMIT 查询多少条 OFFSET 从哪开始
SELECT * FROM `products` LIMIT 20 OFFSET 20;
-- LIMIT offset, limit
SELECT * FROM `products` LIMIT 10,10 ORDER BY price ASC;

