#多对多关系
CREATE TABLE IF NOT EXISTS students(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20) NOT NULL,
age INT
) 

CREATE TABLE IF NOT EXISTS courses(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	price DOUBLE
)

INSERT INTO `students` (name,age) VALUES("poro",18);
INSERT INTO `students` (name,age) VALUES("poroone",18);
INSERT INTO `students` (name,age) VALUES("ThePoro",18);
INSERT INTO `students` (name,age) VALUES("TheBestPoro",18);
INSERT INTO `students` (name,age) VALUES("poroones",18);

INSERT INTO `courses` (name,price) VALUES("计算机科学与技术",100);
INSERT INTO `courses` (name,price) VALUES("java",200);
INSERT INTO `courses` (name,price) VALUES("javascript",300);
INSERT INTO `courses` (name,price) VALUES("v8",400);
INSERT INTO `courses` (name,price) VALUES("go",500);
INSERT INTO `courses` (name,price) VALUES("vue",600)
INSERT INTO `courses` (name,price) VALUES("react",600)
-- 建立students1和courses的 关系表
CREATE TABLE IF NOT EXISTS `students_select_courses` (
	 id INT PRIMARY KEY AUTO_INCREMENT,
	 student_id INT NOT NULL,
	 courses_id INT NOT NULL,
	 FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE,
	 FOREIGN KEY (courses_id) REFERENCES courses(id) ON UPDATE CASCADE
);
# 3.学生选课
-- poro选择了计算机科学与技术 java V8
INSERT INTO `students_select_courses`  (student_id,courses_id) VALUES (2,1);
INSERT INTO `students_select_courses`  (student_id,courses_id) VALUES (2,2);
INSERT INTO `students_select_courses`  (student_id,courses_id) VALUES (2,5);

-- 有选课的所有学生

-- 那些学生还没有选课
SELECT * FROM `students` LEFT JOIN `students_select_courses` ON students.id=students_select_courses.student_id WHERE students_select_courses.student_id is NULL;

-- 有选课的学生,选择了那些课程
SELECT stu.id id ,stu.name stuName , stu.age stuAge , cs.id csID , cs.name csName , cs.price csPrice
FROM `students` stu
JOIN `students_select_courses` ssc ON stu.id=ssc.student_id  
JOIN `courses` cs ON ssc.courses_id=cs.id

-- 查询所有学生的选课清苦去那个
SELECT stu.id id ,stu.name stuName , stu.age stuAge , cs.id csID , cs.name csName , cs.price csPrice
FROM `students` stu 
LEFT JOIN `students_select_courses`ssc ON stu.id=ssc.student_id
LEFT JOIN `courses` cs ON ssc.courses_id=cs.id ORDER BY id desc;

-- 查询那些学生是没有选课
SELECT stu.id id ,stu.name stuName , stu.age stuAge , cs.id csID , cs.name csName , cs.price csPrice
FROM `students` stu 
LEFT JOIN `students_select_courses`ssc ON stu.id=ssc.student_id
LEFT JOIN `courses` cs ON ssc.courses_id = cs.id 
WHERE cs.id IS NULL;

-- 查询哪些课程是没有被选择的
SELECT stu.id id ,stu.name stuName , stu.age stuAge , cs.id csID , cs.name csName , cs.price csPrice
FROM `students` stu 
RIGHT JOIN `students_select_courses`ssc ON stu.id=ssc.student_id
RIGHT JOIN `courses` cs ON ssc.courses_id = cs.id 
WHERE stu.id IS  NULL;

-- 查看某一个学生选择了那些课程

SELECT stu.id id ,stu.name stuName , stu.age stuAge , cs.id csID , cs.name csName , cs.price csPrice
FROM `students` stu 
LEFT JOIN `students_select_courses`ssc ON stu.id=ssc.student_id
LEFT JOIN `courses` cs ON ssc.courses_id = cs.id 
WHERE stu.id = 4;



