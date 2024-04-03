const Koa = require("koa")
const Router = require("koa-router")

const app = new Koa()

const router = new Router()
// cookie 中间件
const cookie = (ctx, next) => {
    const value = ctx.cookies.get("name")
    console.log(value)
    if (value) {
        ctx.cookie = value
        next()
    } else {
        ctx.body = "没有cookie"
    }

}

router.get("/login", (ctx, next) => {
    // 设置cookie
    // maxAge 对应的是毫秒
    ctx.cookies.set("name", "cookie", {
        maxAge: 50 * 1000
    })
    ctx.body = "text"
})

router.get("/demo", cookie, (ctx, next) => {
    // 读取cookie
    ctx.body = `有cookie${ctx.cookie}`
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8888, () => {
    console.log("启动成功")
})