const fs = require("fs")
const { start } = require("repl")
// buffer
const buffer = new Buffer("poro")  //
console.log(buffer.toString())
// 编码格式 utf16le 每个汉字存储2个字节 utf8每个汉字3个字节
const buffer2 = new Buffer.from("你好", "utf16le")
// 解码 默认utf8解码 如果使用其他格式的应该使用对应的解码
console.log(buffer2.toString("utf16le"))

// buffer的alloc
const bufferAlloc = new Buffer.alloc(8)
console.log(bufferAlloc)
// 直接通过下标操控buffer
bufferAlloc[0] = 88
bufferAlloc[1] = 0x88
console.log(bufferAlloc)

fs.readFile("./poro.txt",(err,data)=>{
    console.log(data.toString())
})
fs.readFile("./image/buffer创建方式.png",(err,data)=>{
    console.log(data)
    
    fs.writeFile("./poro.png",data,err=>{
        console.log(err)
    })
})
