const Koa = require("koa")

const app = new Koa();

app.use((ctx, next) => {
  // 设置状态码
    ctx.status=200
//   返回信息 设置内容
    ctx.response.body =
    {
        name: "poro",
        age: 18,
        avatar_url: "xxx"
    }
    // 也可由使用直接.body 原因是做了代理 在koa中的context中的delegate
    ctx.body=["poro",{
        name: "poro",
        age: 18,
        avatar_url: "xxx"
    }]
  
})

app.listen(8888, () => {
    console.log("koa响应内容")
})