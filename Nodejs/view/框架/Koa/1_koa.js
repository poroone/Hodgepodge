const Koa = require("koa")

const app = new Koa()

app.use((ctx, next) => {
    if (ctx.request.url == "/login") {
        if (ctx.request.method == "POST") {
            ctx.response.body = "login "
        }
    } else {
        ctx.response.body = "你好koa"
    }
    console.log("执行1")
})
app.listen(8888, () => {
    console.log("koa server")
})