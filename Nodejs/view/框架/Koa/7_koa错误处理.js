// 第三方库 koa-static
const Koa = require("koa")

const app = new Koa()

app.use((ctx, next) => {
    if (!ctx.body.name) {
        ctx.app.emit("error", new Error("login null"), ctx)
    }
})

app.on("error", (err, ctx) => {
    console.log(err.status, "-----error", ctx)
    ctx.status = 401
    ctx.body = err.message
})

app.listen(8888, () => {
    console.log("server koa")
})