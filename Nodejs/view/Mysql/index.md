SQL语句
DDL
DWL 
DQL
DSL
1. 创建一个数据库 CREATE DATABASE 名字;
2. 查询所有数据库 SHOW DATABASES;
3. 查看当前使用的数据库 SELECT DATABASE();
4. 进入一个表 USE 表名;

5. 创建一个表 CREATE TABLE user(
    name varchar(10),
    age int,
    height double);
6. create table moment( title varchar(20),content varchar(512));
7. 查看当前所有表 SHOW TABLES;
8. 表中添加一个字段 insert into users (name,age,height) values ("poro",18,1.88)
9.  查看一个表 select * from users