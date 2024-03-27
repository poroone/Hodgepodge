const express=require("express")

const app=express()

app.use(express.static("../../"))

app.listen(8888,()=>{
    console.log("启动成功 http://localhost:8888")
})