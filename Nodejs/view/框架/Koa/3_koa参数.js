const Koa = require("koa")
const bodyParse = require("koa-bodyparser")
const multer = require("koa-multer")
const Router = require("koa-router")

const app = new Koa()
const upload = multer()
// 解析json
app.use(bodyParse())
// 解析data-from
app.use(upload.any())


const userRouter = new Router({ prefix: "/user" })
app.use(userRouter.routes())
// 处理 query params
userRouter.get("/:id", (ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.params)
})

// query params
// app.use((ctx, next) => {
//     console.log(ctx.request.url)
//     console.log(ctx.request.query)
//     console.log(ctx.request.params)
// })

// 处理 json 第三方库koa-bodyparser
// 处理data-from 使用第三方库的koa-multer
app.use((ctx, next) => {
    // data-from 内容放在了req.body中 而不是request.body中
    console.log(ctx.req.body)//data-from
    console.log(ctx.request.body)//json
    ctx.response.body = "json"
})
app.listen(8888, () => {
    console.log("listen ")
}) 