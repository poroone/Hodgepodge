#聚合函数的使用
-- 求所有手机价格的综合
-- SUM()求指定字段的总和
SELECT SUM(price) as priceAll FROM `products`;
-- 求华为手机的价格和总合
SELECT SUM(price) as priceAll FROM `products` WHERE brand = "华为";
-- 求华为手机的平均价格
-- AVG(price)
SELECT AVG(price) as priceAll FROM `products` WHERE brand = "华为";
-- 求最高手机价格和最低手机价格
-- MAX(price),MIN(price)
SELECT MAX(price),MIN(price) FROM `products` ;
-- 求华为手机的个数
-- COUNT(*) COUNT(url) 如果写指定字段 就会根据这个字段是否有值来进行返回,没值(null)的话就不算在内. 
SELECT COUNT(url) FROM `products` WHERE brand = "华为" or brand = "苹果";
-- 计算一共包含多少个不重复价格的手机
-- DISTINCT去重
SELECT COUNT(DISTINCT price) FROM `products`;

# GROUP BY的使用 分组 并且排序
SELECT brand,AVG(price),COUNT(*) FROM `products` GROUP BY brand ORDER BY AVG(price) desc;

-- HAVING 是对于分组后的数据进行查询的
SELECT brand ,AVG(price) avgPrice,COUNT(*) FROM `products` GROUP BY brand HAVING avgPrice > 2000 ORDER BY AVG(price) desc;
-- 按照品牌分类 评分大于7.5的手机的平均价格是多少
-- WHERE 应该在  GROUP BY 前使用
SELECT brand,AVG(price) FROM `products` WHERE score > 7.5  GROUP BY brand ;


