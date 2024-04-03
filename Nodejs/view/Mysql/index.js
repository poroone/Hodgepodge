const mysql = require("mysql2");
// 1.建数据库连接
const connection = mysql.createConnection({
    hoot: "localhost",
    port: 3306,
    user: "root",
    password: "poroone2233!",
    database: "poroone"
})
// 2.执行sql语句
// const statement=`
//     SELECT * FROM products WHERE price > 6000;
// `
// connection.query(statement, (err, res, fields) => {
//     console.log(res, fields)
//     // connection.destroy()//强制关闭
//     // connection.end() 结束
// })

// 3.预处理语句 
// const statement = `
//     SELECT * FROM products WHERE price > ? AND score > ?;
// `
// connection.execute(statement,[6000,7],(err,data)=>{
//     console.log(data)
// })


// 4.连接池

// 创建连接池
const connections=mysql.createPool({
    host:"localhost",
    port:3306,
    user:"root",
    password:"poroone2233!",
    database:"poroone",
    connectionLimit:10
})

const statement = `
    SELECT * FROM products WHERE price > ? AND score > ?;
`
// // 使用连接池
// connections.execute(statement,[6000,7],(err,res)=>{
//     console.log(res)
// })


// promise 方式
connections.promise().execute(statement,[6000,7]).then((res)=>{
    console.log(res,"promise")
}).catch((err)=>{
    console.log(err)
}).finally((all)=>{
    console.log(all,"会执行")
})

