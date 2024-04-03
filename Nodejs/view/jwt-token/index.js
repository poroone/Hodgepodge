const Koa = require("koa")
const Router = require("koa-router")
const jwt = require("jsonwebtoken")
const bodyParse = require("koa-bodyparser")
const fs = require("fs")
const app = new Koa()
const router = new Router()
// 非对称加密
// 在项目中任何一个相对路径都是根据 process.cwd() 
const PRIVATE_KEY = fs.readFileSync("./keys/private.key")
const PUBLIC_KEY = fs.readFileSync("./keys/public.key")
// 对称加密
const SERCET_KEY = "POROONE"
// 登录
router.post("/login", (ctx, next) => {
    const user = { id: 1, name: "poro" }
    // 默认hs256 对称加密 SERCET_KEY必须都一样的 
    // const token = jwt.sign(user, SERCET_KEY, {
    //     expiresIn: 10//过期时间 秒
    // })
    // 非对称加密 必须指定算法RS256 私钥 用于颁发令牌 公钥只能用于验证令牌无法用于颁发
    const token = jwt.sign(user, PRIVATE_KEY, {
        expiresIn: 10,
        algorithm: 'RS256'
    })
    console.log(token)
    ctx.body = token
})
// 验证
router.post("/demo", (ctx, next) => {
    // 解析签名
    const authorization = ctx.headers.authorization
    const tokenbody = authorization.replace("Bearer ", "")
    try {
        //对称加密
        // const result = jwt.verify(tokenbody, PUBLIC_KEY)
        // 非对称加密解密
        const result = jwt.verify(tokenbody, PUBLIC_KEY, {
            algorithm: ["RS256"]
        })
        ctx.body = result
    } catch (error) {
        ctx.body = "jwt 失效"
    }
})
app.use(bodyParse())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8888, () => {
    console.log("启动成功")
})