# stream 流
1. 流和fs的区别
   1. fs只能直接读写文件,不能控制细节
   2. fs不能控制从那开始读,读到什么位置,一次性读取多少字节
   3. 读取到某个位置后,暂停读取,某个时候回复读取
   4. 或一个文件非常大,比如一个视频文件,一次性全部读取并不好
# 文件读写的stream 
1. node中基于stream流实现的模块
   1. http模块的response,request
   2. process.stdout对象
2. 所有流都是EventEmitter的实例
3. node中有四种基本流类型
   1. Writable:可以向其写入数据的流(例如fs.createWriteStream())
   2. Readable :可以从中读取数据的流(例如fs.createReadStream())
   3. Duplex:同时为Readable和writable(例如net.Socket)
   4. Transform:Duplex可以在写入和读取数据时修改或转换数据的流(例如Zlib.createDeflate())
# Writable
    对文件进行写入以流的形式
1. fs.createWriteStream("文件地址",options)
```javascript 
     const write=fs.createWriteStream("文件路径",{
        flags:"a",
        start:3,
     })
     write.write("写入的内容",(err)=>{
        console.log(err)
     })
     write.close()//对打开的文件进行关闭
     write.end("写入的内容") //可以写入并且关闭
      write.on("close",()=>{
        console.log("关闭")
     })

```
# Readable
    对文件进行读取以流的形式
1. fs.createReadStream("文件路径",options)
```javascript
    const read =fs.createReadStream("文件路径",{
        start:3, //第几个开始
        end:10, //到底几个结束
        highWaterMark:3//每次读取几个
    })
    read.on("data",(stream)=>{
        console.log(stream)//buffer

    })
    // pipe
    const readPoro = fs.createReadStream("./poro.txt")
    const writePoro = fs.createWriteStream("./porowrit.txt")
    readPoro.pipe(writePoro)
    writePoro.close()
```

