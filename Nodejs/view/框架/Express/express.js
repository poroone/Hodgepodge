const express = require('express')

// express其实是一个函数 createApplication

const app = express()


// 中间件1
// app.use((req, res, next) => {
//     console.log("中间件1")
//     next()
// })
// app.use((req, res, next) => {
//     console.log("中间件2")
//     next()
// })
// 中间件2 路径匹配
// app.use((req, res, next)=>{
//     console.log("home")
//     next()
// })

// app.use("/home",(req, res, next)=>{
//     console.log("home1")
//     next()
//     console.log("home4")
   
// })
// app.use("/home",(req, res, next)=>{
//     console.log("home2")
//     next()
// })

// 中间件3 路径和方法匹配中间件

// app.get('/', (req, res, next) => {
//     res.end("123")
// })
// app.get('/home', (req, res, next) => {
//     res.end("get123")
// })
// app.post('/home', (req, res, next) => {
//     res.end("post123")
// })

// app.get('/login', (req, res, next) => {

//     next("123456789")
// })


// 中间件4 连续注册中间件
app.use("/home",(req,res,next)=>{
    console.log("中间件1")
    next()  
})
app.get('/home', (req, res, next) => {
    console.log("home1")
    next()
}, (req, res, next) => {
    console.log("home2")
    next()
}, (req, res, next) => {
    console.log("home3")
    next()
}, (req, res, next) => {
    console.log("home4")
    res.end("结束")
})


const port = 8888
app.listen(port, () => {
    console.log(`server http://localhost:${port}`)
})