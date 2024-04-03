# 查询所有数据库
SHOW DATABASES;

# 选择某一个数据库 
USE sys;

# 查询当前正在使用的数据库
SELECT DATABASE();

# 创建数据库 
-- CREATE DATABASE shop;
-- 如果数据库不存在就创建
-- CREATE DATABASE IF NOT EXISTS shop;
CREATE DATABASE IF NOT EXISTS thebset DEFAULT CHARACTER SET utf8mb4
				COLLATE utf8mb4_0900_ai_ci;
				
# 删除数据库
DROP DATABASE IF EXISTS thebset

#修改数据库的编码
ALTER DATABASE  sys CHARACTER set = utf8
				COLLATE utf8_unicode_ci;
 