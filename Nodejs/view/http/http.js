const http = require('http')
const url = require("url")
const qs = require("querystring")
const { Console } = require('console')
const server1 = new http.Server((req, res) => {
     console.log("123")
     res.end("hello")
})
const server2 = http.createServer((req, res) => {
     // request 对象中封装了客户端给我们服务器传递过来的所有信息
     console.log(req.url)  // url
     console.log(req.method) //post || get
     console.log(req.headers) //headers
     console.log(url.parse(req.url))


     // url处理 get获取query中的值   
     const { pathname, query } = url.parse(req.url)
     const { username, password } = qs.parse(query)
     console.log(username, password)


     // post 
     req.setEncoding('utf8')//utf-8 
     // req.setEncoding('binary')//二进制登 
     if (req.method == "POST") {
          req.on("data", (data) => {
               console.log(data)
               const { username, password } = JSON.parse(data)
               console.log(username, password)
          })
     }
     // 设置响应头
     // 设置方式一
     // res.setHeader("Content-Type", "text/plain;charset=utf8")
     // 设置方式二
     res.writeHead(200, {
          "Content-Type": "text/html;charset=utf8"
     })

     //设置状态码
     // 方式一 直接给属性赋值
     res.statusCode = 400;
     // 方式二 和Head一起设置
     // res.writeHead(503)

     // 返回关闭
     res.write("请求成功")
     res.end("<h2>你好返回</h2>")
})

server2.listen(8888, '0.0.0.0', () => {
     console.log("启动成功: http://localhost:8888")
     console.log(server2.address().port)
}) 