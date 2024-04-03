#DML

-- 插入数据
INSERT INTO `user` VALUES (10,"poro",18,1.88,'2024-3-31')
INSERT INTO `user` (name,age,height,updataTime) VALUES ( 'poreoone',18,1.70,'2024-3-31 10:21:04')

--  createTime和 updataTime 可以自动设置值
ALTER TABLE `user` MODIFY `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
ALTER TABLE `user` MODIFY `updataTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 

INSERT INTO `user` (name,age,h eight) VALUES ("PORO",18,1.5)

-- 删除数据
-- 删除所有数据
DELETE FROM 'user';
-- 删除符合条件的数据
DELETE FROM 'user'  WHERE  id=110;
-- 更新所有数据
UPDATE `user` SET name ='poro',age =18;
-- 更新符合条件的数据
UPDATE `user` SET name = "POROONE
",age=20 WHERE id=10;

