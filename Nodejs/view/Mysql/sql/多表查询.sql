 #多表查询
-- 笛卡尔乘积 直积  (不建议)
-- 1. 获取到的是笛卡尔乘积 
SELECT * FROM `brand`, `products`
-- 2.获得道德笛卡尔乘积进行筛选
SELECT * FROM `brand`, `products` WHERE brand.id = products.brand_id
# 多表连接 sql joins
--  左连接 右连接 内连接 全连接

-- 左连接
-- 根据左面的表为主
查询所有的手机(包括没有品牌信息的手机) 以及对应的品牌 null  
SELECT * FROM `products`LEFT JOIN `brand` ON products.brand_id = brand.id
-- 查询没有对应品牌数据的手机
SELECT * FROM `products`LEFT JOIN `brand` ON products.brand_id = brand.id WHERE brand.id IS NULL;
-- 查询有品牌数据的手机
SELECT * FROM `products`LEFT JOIN `brand` ON products.brand_id = brand.id WHERE brand.id IS NOT NULL;

-- 右连接
-- 根据右面的表为主
查询所有的手机(包括没有品牌信息的手机) 以及对应的品牌 null  
SELECT * FROM `products`RIGHT JOIN `brand` ON products.brand_id = brand.id
-- 查询没有对应品牌数据的手机
SELECT * FROM `products`RIGHT JOIN `brand` ON products.brand_id = brand.id WHERE products.brand_id IS NULL;
-- 查询有品牌数据的手机
SELECT * FROM `products`RIGHT JOIN `brand` ON products.brand_id = brand.id WHERE products.brand_id IS NOT NULL;

# 内连接
-- 有对应关系的
-- INNER 或者  CROSS 或者省略
SELECT * FROM `products` JOIN `brand` ON products.brand_id = brand.id;
SELECT * FROM `products` JOIN `brand` ON products.brand_id = brand.id WHERE price >1000 AND price <5000;

#全连接 
-- 两个表 所有的数据
-- MYSQL 不支持 FULL OUTER JOIN
SELECT * FROM `products` FULL OUTER JOIN `brand` ON products.brand_id = brand.id;
-- 可以使用 UNION 进行联合左连接和右连接 重复的会自动删掉
SELECT * FROM `products` LEFT JOIN `brand` ON products.brand_id = brand.id 
UNION
SELECT * FROM `products` RIGHT JOIN `brand` ON products.brand_id = brand.id 


-- 全连接取反
-- 两个表都没有的数据
SELECT * FROM `products` LEFT JOIN `brand` ON products.brand_id = brand.id WHERE brand.id IS NULL 
UNION
SELECT * FROM `products` RIGHT JOIN `brand` ON products.brand_id = brand.id WHERE products.brand_id IS NULL 


