# Express 
    Node中比较流行的Web服务器框架是express、koa；
    Express整个框架的核心就是中间件
# Express安装
1. 方式一使用express脚手架
```javascript
    npm install express-generator
    // 创建项目
    express 名称
```
2. 方式二 npm 或包管理器
 ```javascript
  npm init -y
  npm i express
```
3. 启动服务
   1. 正常node启动服务 node xxx.js每次修改都需要重启项目
可以使用nodemon 进行启动服务
```javascript
npm i nodemon
```
# Express的基本使用
```javascript
const express=require("express");
const app=express()
app.get("/",(req,res,next)=>{
    //req 请求的信息
    //res 返回
    //next 调用下一个中间件
    req.headers//请求头
    req.method//请求方法
    // 返回数据一般使用
    res.status(200)//返回的状态码
    res.json() //发返回一个json数据
    res.end()//接受一个string

})
app.listen(8888,()=>{
    console.log("server http://localhost:8888")
})
```
# 中间件
    Express是一个路由和中间件的Web框架，Express应用程序本质上是一系列中间件函数的调用
1. 什么是中间件
   1. 中间件的本质是传递给express的一个回调函数
   2. 这个回调函数接受三个参数：
      1. req(request对象),
      2. res(response对象),
      3. next(在express中定义的用于执行下一个中间件的函数)
2. 中间件可以做什么
   1. 执行任何代码；
   2. 更改请求（request）和响应（response）对象
   3. 结束请求-响应周期（返回数据）；
   4. 调用栈中的下一个中间件；
3. 如果当前中间件功能没有结束请求-响应周期，则必须调用next()将控制权传递给下一个中间件功能，否则，请求将被挂起。
![express中间件](../../image/express%E4%B8%AD%E9%97%B4%E4%BB%B6.png)

# 使用中间件
1. express主要提供了两种方式：app/router.use和app/router.methods(get/post/patch等)；
# post 
### post body解析 json等
使用expres内置的中间件或者使用body-parser来完成
```javascript
app.use(express.json())//处理json
// extended type boolean :true/false
// true :那么对urlencoded进行解析的时候,它使用的是第三方库: qs
// false :那么对urlencoded进行解析时 ,它使用的Node内置模块: queryString
app.use(express.urlencoded({extended:true})) ///处理x-www-from-urlencoded
app.use(express.raw())//处理raw
app.use(express.text())//处理text
```
### post 解析form-data
    使用multer 解析form-data
1. 处理文件上传
```javascript 
// 文件上传目的地
const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,'./uploads/')
   },
   filename:(req,file,cb)=>{
      console.log(path.extname(file.originalname))
      cb(null,Date.now()+path.extname(file.originalname));
   }
})
const upload=multer({
   storage
})

// -----------------------------------------
// 上传单个文件 使用single
 app.post("/upload",upload.single("file"),(req,res,next)=>{
   console.log(req.file)
   console.log(req.body)
   res.end("文件上传") 
})
// 上传多个文件 使用array
app.post("/uploads",upload.array("file"),(req,res,next)=>{
   console.log(req.files)
   console.log(req.body)
   res.end("文件上传") 
})

```
2. 处理普通数据
```javascript 
app.use(upload)
app.use("/home",upload.any(),(req,res,next)=>{
    console.log(req.body)
})
```

# GET
## 处理get的params
```javascript
// params http://localhost:8888/shop/123/456
app.get("/shop/:id/:name",(req,res,next)=>{
   console.log(req.params) // {id:"123",name:"456"}
   res.end("hello word")
})
```
## 处理get的query
```javascript
// query参数 http://localhost:8888/user?id=123
app.get("/user",(req,res,next)=>{
   console.log(req.query)// {id:"123"} 
   res.end("hello word")
})
```

# res 响应数据
1. end
   1. 和http中的response.end方法，用法是一致的
```javascript
app.get("/user",(req,res,next)=>{
    res.end("返回")
})
```
2. json
   1. json方法中可以传入很多的类型：object、array、string、boolean、number、null等，它们会被转换成json格式返回；
```javascript
app.get("/user",(req,res,next)=>{
    res.json({name:"poro",age:18})
})
```
3. status 方法状态码
```javascript
app.get("/user",(req,res,next)=>{
    res.status(200)//在返回之前设置状态码
    res.json({name:"poro",age:18})
})
```
4. 更多响应方式 https://www.expressjs.com.cn/4x/api.html#res
# Express的路由
    express.Router()可以创建一个路由程序
```javascript
    const express= require('express')
    const usersRouter=express.Router()
    usersRouter.get("/",(req,res,next)=>{
        res.json({name:"poro",age:18})
    })
    module.exports=usersRouter

//----------------------------------------------------------------  
// 使用的地方直接引入
const express= require('express')
const userRouter=require('路由文件')
const app= express()
app.use("/user",userRouter)
app.listen(8888,()=>{
    console.log("server")
})

```    
# 静态资源服务器
    express也可以部署静态服务器
```javascript
const express=require("express")

const app=express()

app.use(express.static("文件地址"))

app.listen(8888,()=>{
    console.log("启动成功 http://localhost:8888")
})
```
# 服务端的错误处理

```javascript
const express = require("express")

const multer = require("multer")

const upload = multer()
const app = express()

// 定义错误常量
const USERNAME_DOES_NOT_EXIST = "username does not exist"
const USERNAME_ALREADY_EXIST = "username already exist"
// 登录接口
app.post("/login", upload.any(), (req, res, next) => {
    if (req.body.username) {
        res.json("user login success")
    } else {
        // next在不传参数的时候是一个正确的next会寻找下一个正确的中间件
        // 如果传递参数代表是一个错误的,回去寻找错误的中间件
        next(new Error(USERNAME_DOES_NOT_EXIST));
    }
})
//  注册接口
app.post("/register", upload.any(), (req, res, next) => {
    if (!req.body.username) {
        res.json("user login success")
    } else {
        next(new Error(USERNAME_ALREADY_EXIST));
    }
})

// 错误中间件 4个参数用来处理错误的next
app.use((err, req, res, next) => {
    // 返回状态码
    let status = 400;
    // 返回信息
    let message = ""

    switch (err.message) {
        case USERNAME_DOES_NOT_EXIST:
            message = "username does not exist"
            break
        case USERNAME_ALREADY_EXIST: 
            message = "username already exist"
            break
        default:
            message = "NOT FOUND"
    }

    res.status(status)

    res.json({
        "errorCode":status,
        "errorMessage":message
        }) 
})

app.listen(8888, () => {
    console.log("server 8888 http://localhost:8888")
})
```




# 第三方库

##  用于解析body
    body-parser:3.x 内置express框架
    body-parser:4.x 被分离出去了
    body-parser:4.16.x 被内置成函数了

##  记录请求日志
    可以使用express官网开发的第三方库：morgan
    npm i morgan
```javascript
// 发送请求后会存储到logs下的access.log文件
const writeStream=fs.createWriteStream("./logs/access.log",{
   flags:"a+"
})

```
     
