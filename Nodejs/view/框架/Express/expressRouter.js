const express= require('express')

const userRouter= require('./routers/user')

const app=express()

app.use("/users",userRouter)

 app.listen(8888,()=>{
    console.log("路由服务器创建成功")
 })