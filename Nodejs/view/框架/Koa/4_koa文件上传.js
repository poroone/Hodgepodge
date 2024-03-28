const Koa = require("koa")
const path=require("path")
const Router = require("koa-router")
const multer = require("koa-multer")

const app = new Koa()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./upload/")
    },
    filename:(req,file, cb )=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})
const uploadRouter = new Router({ prefix: "/upload" })

 
uploadRouter.post("/avatar", upload.single("file"), (ctx, next) => {
    console.log(ctx.req.file)
    ctx.response.body="avatar 成功"
})



app.use(uploadRouter.routes())
app.listen(8888, () => {
    console.log("listen ")
}) 