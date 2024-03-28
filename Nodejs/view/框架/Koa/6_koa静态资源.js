// 第三方库 koa-static
const Koa=require("koa")
const StaticAssets=require("koa-static")

const app=new Koa()

app.use(StaticAssets("./"))

app.listen(8888,()=>{
    console.log("server koa")
})