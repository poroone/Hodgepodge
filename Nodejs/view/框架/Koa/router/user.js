// 第三方库 koa-router
const Router=require("koa-router")

const router=new Router({prefix:"/users"})

router.get ("/",(ctx,next)=>{
    ctx.response.body="get"
 })
 

router.put ("/",(ctx,next)=>{
   ctx.response.body="put"
})

module.exports = router