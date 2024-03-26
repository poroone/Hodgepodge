const http = require("http")
const fs = require("fs")
const qs = require("querystring")
const server = http.createServer((req, res) => {
    console.log(req.headers)
    // 由于是二进制 所以应该使用二进制进行编码
    req.setEncoding("binary")
    // 二进制图片数据
    let body = ''
    // 拿到boundary
    let boundary = req.headers["content-type"].split(";")[1]
    console.log(boundary)
    boundary=boundary.split("=")[1]

    req.on("data", (data) => {
        body += data
    })
    
    req.on("end", () => {
        // console.log(body)
        // 获取image/png的位置
        // qs.parse(分割的值,"用什么分割" 默认&,"用什么分割"默认=)
        const bodyString = qs.parse(body, "\r\n", ": ")
        const type = bodyString["Content-Type"]

        // 2.开始image/png的位置进行截取
        const typeIndex = body.indexOf(type)
        const typeLength = type.length
        let imageData = body.substring(typeIndex + typeLength)
        console.log(typeof (imageData), "image")
        // 3.将中间的两个空格
        // 把\r\n\r\n 替换掉
        // imageData = imageData.replace('\r\n\r\n', '')
        imageData = imageData.replace(/^\s\s*/, '')
        // 4.取出boundary去除掉
        console.log(boundary,"123132")
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))
        console.log(imageData,"123132")

        fs.writeFile("./foo.jpg", imageData, "binary", () => {
            console.log("文件上传成功")
        })

        qs.parse()
        res.end("成功")
    })

})
server.listen(8889, () => {
    console.log("开启成功 http://localhost:8888")
})
