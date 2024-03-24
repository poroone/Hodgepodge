const fs = require("fs")

// 默认使用fs读取
const txt = fs.readFileSync("./poro.txt")
console.log(txt)

// 使用流stream  Readable的使用
const reader = fs.createReadStream("./poro.txt", {
    encoding: "utf8",
    start: 3,
    end: 7,
    highWaterMark: 2
})
let i = 0
reader.on("data", (stream) => {
    console.log(stream.toString(), `${i++}`)
    reader.pause() //暂停
    setTimeout(() => reader.resume(), 1000)
})
reader.on("open", () => {
    console.log("文件被打开")
})
reader.on("close", () => {
    console.log("文件关闭")
})


// fs的写入
fs.writeFile("./poro.txt", "你好魄罗", (data) => {
    console.log(data)
})



// stream Write的使用
const write = fs.createWriteStream("./poro.txt", {
    flags: "a",
    start: 4,
    highWaterMark: 2
})
// 进行写入
write.write("你好呀", (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("写入成功")
})

write.close() //关闭写入
// write.end("关闭")//写入并且关闭
write.on("close", () => {
    console.log("关闭")
})

// 赋值写发 pipe
// 传统
fs.readFile("poro.txt", (err, data) => {
    console.log(data)
    fs.writeFile("pocopy.txt", data, (err) => {
        console.log(err)
    })
})
// stream 写法
const readPoro = fs.createReadStream("./poro.txt")
const writePoro = fs.createWriteStream("./porowrit.txt")
readPoro.pipe(writePoro)
writePoro.close()