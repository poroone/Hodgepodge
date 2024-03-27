const express=require('express')
const path=require("path")
const fs=require("fs")
const multer=require("multer")
const morgan=require("morgan")

const app=express()
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
const writeStream=fs.createWriteStream("./logs/access.log",{
   flags:"a+"
})
app.use(morgan("combined",{
   stream:writeStream
}))
// 自己写的解析body方式 
//  app.use((req,res,next)=>{
//     if(req.headers["content-type"]=="application/json"){
//         req.on("data",(data)=>{
//           const info=JSON.parse(data.toString())
//           req.body={}
//           Object.assign(req.body, info)
//         })
//         req.on("end",()=>{
//             next()
//         })
//     }else{
//         next()
//     } 
//  })

// express提供的解析body方式
// raw json text urlencoded
app.use(express.json())
// extended type boolean :true/false
// true :那么对urlencoded进行解析的时候,它使用的是第三方库: qs
// false :那么对urlencoded进行解析时 ,它使用的Node内置模块: queryString
// qs 和 queryString 的区别
app.use(express.urlencoded({extended:true}))


// params http://localhost:8888/shop/123/456
app.get("/shop/:id/:name",(req,res,next)=>{
   console.log(req.params) // {id:"123",name:"456"}
   res.end("hello word")
})
// query参数 http://localhost:8888/user?id=123
app.get("/user",(req,res,next)=>{
   console.log(req.query)// {id:"123"} 
   res.end("hello word")
})

// 返回json数据
app.get("/home",(req,res,next)=>{
   res.status("300")
   // 1.JSON
   //  res.type("application/json");
   //  console.log(req.body)
   //  res.end(JSON.stringify({name:"poro",age:18})) 
   // 方法2
   // res.json({name:"poro",age:19})
   res.json([{name:"poro",age:123},{name:"poro",age:123}])
})


// 用于解析from-data中的数据 upload.any() 
 app.post("/login",upload.any(),(req,res,next)=>{
   console.log(req.body)
   res.end("123") 
 })


 // 上传一个文件使用 single 多个使用array
//  上传单个
 app.post("/upload",upload.single("file"),(req,res,next)=>{
   console.log(req.file)
   console.log(req.body)
   res.end("文件上传") 
})
//  上传多个
app.post("/uploads",upload.array("file"),(req,res,next)=>{
   console.log(req.files)
   console.log(req.body)
   res.end("文件上传") 
})



 app.post("/products",(req,res,next)=>{
    console.log(req.body)
    res.end("上传")
 }) 


 app.listen(8888,()=>{
    console.log("server http://localhost:8888")
 })