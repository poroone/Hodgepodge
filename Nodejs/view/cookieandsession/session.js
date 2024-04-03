const Koa = require("koa")
const Router = require("koa-router")
const Session = require("koa-session")
const app = new Koa()

const router = new Router()
// session配置
const session = Session({
    key: 'sessionid',
    maxAge: 10 * 1000,
    signed: true  //是否使用加密签名 防止客户端随便修改session 
}, app)
// 对session进行加严
app.keys=["aaa"]

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
    const id = "10";
    const name = "poro"
    // 存储session
    ctx.session.user = { id, name }
})

router.get("/demo", (ctx, next) => {
    // 读取session
    console.log(ctx.session.user) 
    ctx.body = ``
})
app.use(session)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8888, () => {
    console.log("启动成功")
})