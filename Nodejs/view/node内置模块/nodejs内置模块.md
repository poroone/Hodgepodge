# path
1. path模块用于对路径和文件进行处理，提供了很多好用的方法。
2. Mac OS、Linux和window上的路径是不一样的
   1. window上会使用 \或者 \\ 来作为文件路径的分隔符，当然目前也支持 /；
   2. 在Mac OS、Linux的Unix操作系统上使用 / 来作为文件路径的分隔符；
3. 那么如果在window上使用 \ 来作为分隔符开发了一个应用程序，要部署到Linux上面应该怎么办呢？  
   1. 显示路径会出现一些问题
   2. 所以为了屏蔽他们之间的差异，在开发中对于路径的操作我们可以使用 path 模块；
# path常见的API
1. 从路径中获取信息
   1. dirPath : 获取父文件的文件名
   2. basename : 获取文件名
   3. extname : 获取文件后缀名
2. 路径拼接
   1. path.join()
3. 将文件和某个文件夹拼接
   1. 文件和文件夹拼接，可以使用 path.resolve;
   2. resolve函数会判断我们拼接的路径前面是否有 /或../或./；
   3. 如果有表示是一个绝对路径，会返回对应的拼接路径；
   4. 如果没有，那么会和当前执行文件所在的文件夹进行路径的拼接
4. webpack中使用path
```javascript
   const path = require('path')
   const resolve=dir=>path.resolve(__dirname,dir)
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        ":@": resolve("src")
      }
    }
  }
}

```
# 内置fs模块
1. fs是File System的缩写，表示文件系统。
2. fs api地址
   1. https://nodejs.org/dist/latest-v14.x/docs/api/fs.html

# API提供三种操作方式
1. 同步操作文件：代码会被阻塞，不会继续执行；
2. 异步回调函数操作文件：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行；
3. 异步Promise操作文件：代码不会被阻塞，通过 fs.promises 调用方法操作，会返回一个Promise，可以通过then、catch进行处理；

- 获取一个文件的状态
   
```javascript
// 同步读取
const state=fs.statSync("xxx.txt'")
console.log(state)

console.log("后续代码")

// 异步读取
fs.stat("../foo.text",(err,state)=>{
   if(err){
      console.log(err)
      return
   }
   console.log(state)
})
console.log("后续代码执行")

// promise
fs.promise.stat("xxx").then(state=>{
   console.log(state)
}).catch(err=>{
   console.log(err)
}).finally()
console.log("后续代码执行")
```
# 文件的读写
1. fs.readFile(path[, options], callback)：读取文件的内容；
2. fs.writeFile(file, data[, options], callback)：在文件中写入内容；
```javascript
   const fs=require("fs")
   // 文件读取
   fs.readFile(xxx,{encoding:"utf-8"},(err,data)=>{\
   //如果不写encoding:"utf-8" data返回的是一个buffer 二进制可以通过toString转成想要的
      console.log(data) 
   })
// 文件写入
    fs.writeFile(xxx,"xxxx",{flag:"a+",err=>{
      console.log(err)
    }})
```
- options参数
   1. flag：写入的方式。
      1. flag的值有很多：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_system_flags
      2. w 打开文件写入，默认值；
      3. w+打开文件进行读写，如果不存在则创建文件；
      4. r+ 打开文件进行读写，如果不存在那么抛出异常；
      5. r打开文件读取，读取时的默认值；
      6. a打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
      7. a+打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件
   2. encoding：字符的编码
      1. 关于字符编码的文章：https://www.jianshu.com/p/899e749be47c
      2. 基本用的都是UTF-8编码；
   # 文件夹操作
   1. 新建文件夹
      1. 使用fs.mkdir()或fs.mkdirSync()创建一个新文件夹：

```javascript
const dirname="xxxx"
// 查看是否有这个文件夹 如果没有
   if(！fs.existsSync(dirname)){
      // 进行创建
      fs.mkdir(dirname,(err)=>{
         console.log(err)
      })
   }
```
   2. 获取文件夹的内容
```javascript
   function readFolders(folder)=>{
         fs.readdir(folder,{withFileType:true},(err,files)=>{
                 files.foreach(file=>{
                  // 检测file是否是一个文件夹?true:false
                  if(file.isDirectory()){
                     // 如果是文件夹就再次递归
                     const newFolder=path.resolve(dirname,file.name);
                     readFolders(newFolder)
                  } else{
                     // 打印文件内name1=
                     console.log(file.name)
                  }
                 })
         })
   }
```  
   3. 文件夹重命名
```javascript
   fs.rename("xxxx","xxxx",err=>{
      console.log(err)
   })
```
# 文件夹复制
```javascript
   const fs =require("fs")
   const path =require("path")

   const srcDir=process.argv[2];
   const destDir=process.argv[3];

   let i=0;
   while(i<30){
      i++
      const num="day"+(i+'').padStart(2,0)
      const srcPath=path.resolve(srcDir,num)
      const destPath=path.resolve(destDir,num)
      if(fs.existsSync(destPath)) continue;
      fs.mkdir(destPath,(err)=>{
         if(!err) console.log("文件创建成功开始拷贝",num)
         const srcFile=fs.readDirSync(srcPath)
         for(const file ofsrcFile ){
            if(file.endsWith(".mp4")){
               const srcFile=path.resolve(srcPath,file)
               const destFile=path.resolve(destPath,file)
               fs.copyFileSync(srcFile,destFile);
               console.log("拷贝成功")
            }
         }
      })
   }
```
# event模块
1. Node中的核心API都是基于异步事件驱动
   1. 在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
   2. 我们可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用；
1. 发出事件和监听事件都是通过EventEmitter类来完成的，它们都属于events对象。
   1. emitter.on(eventName, listener)：监听事件，也可以使用addListener；
   2. emitter.off(eventName, listener)：移除事件监听，也可以使用removeListener；
   3. emitter.emit(eventName[, ...args])：发出事件，可以携带一些参数；
```javascript
   const Event()=require("events")
   const bus =new Event()

   function clickHandel(arg){
      console.log("监听click事件",args)
   }
   bus.on("click",clickHanlde)
   setTimeout(()=>{
      bus.emit("click","poro")
      bus.off("click",clickHandel)
      bus.emit("click","poro")
   },2000)
```
# 常见的属性
1. EventEmitter的实例有一些属性，可以记录一些信息：
   1. emitter.eventNames()：返回当前 EventEmitter对象注册的事件字符串数组；
   2. emitter.getMaxListeners()：返回当前 EventEmitter对象的最大监听器数量，可以通过setMaxListeners()来修改，默认是10；
   3. emitter.listenerCount(事件名称)：返回当前 EventEmitter对象某一个事件名称，监听器的个数；
   4. emitter.listeners(事件名称)：返回当前 EventEmitter对象某个事件监听器上所有的监听器数组；
# 方法的补充
   1. emitter.once(eventName, listener)：事件监听一次
   2. emitter.prependListener()：将监听事件添加到最前面
   3. emitter.prependOnceListener()：将监听事件添加到最前面，但是只监听一次
   4. emitter.removeAllListeners([eventName])：移除所有的监听器
