
# 前端路由是如何做到URL和内容进行映射呢
    监听url的变化
### URL的hash
- URL的hash也就是锚点(#), 本质上是改变window.location的href属性
- 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新
- hash的优势就是兼容性更好，在老版IE中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径
# h5的history Api
- replaceState：替换原来的路径；
- pushState：使用新的路径；
- popState：路径的回退；
- go：向前或向后改变路径；
- forward：向前改变路径；
- back：向后改变路径；
# vue-router 
    Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得非常容
### 路由的使用步骤
1. 使用vue-router的步骤:
   1. 第一步：创建路由组件的组件；
   2. 第二步：配置路由映射: 组件和路径映射关系的routes数组；
   3. 第三步：通过createRouter创建路由对象，并且传入routes和history模式；
   4. 第四步：使用路由: 通过`<router-link>`和`<router-view>`；
# 路由基本流程

### hash模式 配置
```javascript
    // router.js
    import { createRouter,createWebHashHistory } from 'vue-router'
    const routes=[{
        path:"/",
        directive:"/home"
    
    },{
        path:"/home",
        name:"home",
        component:()=> import("xxxxx")
    }]
    const router=createRouter({
        routes,
        history:createWebHashHistory()
    })
    export default router
```
### history模式
```javascript
    // router.js
    import { createRouter,createWebHistory } from 'vue-router'
    const routes=[{
        path:"/",
        directive:"/home"
    
    },{
        path:"/home",
        name:"home",
        component:()=> import("xxxxx")
    }]
    const router=createRouter({
        routes,
        history:createWebHistory()
    })
    export default router
```
- 挂载
```javascript
// app.js
import router from "router.js"
app.use(router)
```

# router-link
### 属性
- to属性：
  - 是一个字符串，或者是一个对象
-  replace属性：
   - 设置 replace 属性的话，当点击时，会调用 router.replace()，而不是 router.push()；
- active-class属性：
  - 设置激活a元素后应用的class，默认是router-link-active
- exact-active-class属性：
  - 链接精准激活时，应用于渲染的 `<a>` 的 class，默认是router-link-exact-active；
# 路由懒加载

- component可以传入一个组件，也可以接收一个函数，该函数 需要放回一个Promise；
- 而import函数就是返回一个Promise
- 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效；
- 也可以提高首屏的渲染效率
```javascript
  const routes=[{
        path:"/",
        directive:"/home"
    
    },{
        path:"/home",
        name:"home",
        component:()=> import("xxxxx")
    },{
         component: () => import(/* webpackChunkName: "directive" */ '../views/自定义指令directives/directives.vue') //路由分包命名 通过/* webpackChunkName: "directive" */
    }]
```
# 动态路由
``` javascript
const routes=[{
        path:"/",
        directive:"/home"
    
    },{
        path:"/home/:name",
        name:"home",
        component:()=> import("xxxxx")
    },{
         path:"/directives/:name/info/:id",
        name:"directives",
         component: () => import(/* webpackChunkName: "directive" */ '../views/自定义指令directives/directives.vue') //路由分包命名 通过/* webpackChunkName: "directive" */
    }]
    <router-link to="/home/poro">poro</router-link>
     <router-link to="/directives/poro/info/123">poro</router-link>
```
# 获取动态路由的值
- 在template中，直接通过 $route.params获取值；
- 在created中，通过 this.$route.params获取值；
- 在setup中，我们要使用 vue-router库给我们提供的一个hook useRoute；
- 该Hook会返回一个Route对象，对象中保存着当前路由相关的值
```javascript
    <template>
        <div>
            {{$router.params.id}}
        </div>
    </template>
    created(){
           console.log(this.$route.params.id)
    }
    setup(){
        const router=useRoute()
        console.log(route)
        console.log(route.params.id)
    }
```
# 未匹配到路由
    当点击一个路由进行跳转时 没有匹配到对应的路由可以通过pathMatch(.*)
    可以通过$route.params.pathMatch获取到传入的参数
```javascript
    {
        
        path:"/:pathMatch(.*)" | "/:pathMatch(.*)*",
        component:()=>import("xxx.vue") | directive:"xxx"
        // 可以直接跳转组件或者重定向到对应组件
    }
    <router-link to="/home/poro/123/456">poro</router-link>
    <template>
         <div>{{$route.params.pathMatch}}</div>
         /:pathMatch(.*)和/:pathMatch(.*)*区别就是是否解析 /
        如果是/:pathMatch(.*)
                /home/poro/123/456
        如果是/:pathMatch(.*)*
                ["home","poro","123","456"]
    </template>
```
# 路由嵌套
``` javascript
const routes=[{
        path:"/home",
         component:()=> import("xxxxx")
    },{
        path:" ",
        directive:"/home/directives",
    },{
        path:"directives",
        name:"directives",
         component: () => import(/* webpackChunkName: "directive" */ '../views/自定义指令directives/directives.vue') //路由分包命名 通过/* webpackChunkName: "directive" */
    }]
```
# 通过js进行页面跳转
```javascript
    this.$router.push("/home")
    this.$router.push({
        path: "/home",
    })
在setup中
    const router=useRouter()
    router.replace("/home")
```
# push() 和 replace()   
    push的特点是压入一个新页面如果用户在点击返回时上一个页面还可以回退,如果我们希望页面是一个替换的操作可以时使用replace
# 页面前进和后退
 router.go()
 ```javascript
//  前进一个
// 和router.forward()相同
router.go(1)
//  后退一个
// 和router.back()相同
router.go(-1)
// 前进10个如果没有那么多默认失败
router.go(10)
router.go(-10)
// 前进一个
router.forward()
// 后退一个
router.back()
```
# router-link的 v-slot
- 在vue-router3.x的时候，router-link有一个tag属性，可以决定router-link到底渲染成什么元素
- 但是在vue-router4.x开始，该属性被移除了,而给我们提供了更加具有灵活性的v-slot的方式来定制渲染的内容；
  
### 使用v-slot来作用域插槽来获取内部传给我们的值
- href：解析后的 URL；
- route：解析后的规范化的route对象；
- navigate：触发导航的函数；
- isActive：是否匹配的状态；
- isExactActive：是否是精准匹配的状态；
```javascript
<router-link to="/about" v-slot={href,route,navigate,isActive,isExactActive}>

</router-link>
```
# router-view的 v-slot
- router-view也提供给我们一个插槽，可以用于 <transition> 和 <keep-alive> 组件来包裹你的路由组件：
  - Component：要渲染的组件；
  - route：解析出的标准化路由对象；
```javascript
 <router-view v-slot="{ Component, route }">
    <template name="poro">
      <keep-alive>
        <component :is="Component" :key="route.path"></component>
      </keep-alive>
    </template>
  </router-view>
```
# 动态添加路由
    在某种情况下可能需要动态进行添加路由
    1. 比如我们根据用户不同的权限,注册不同的路由可以通过addRoute进行添加
```javascript
const pathRouter={
    path:"/path",
    component:()=>import("xxxx")
}
router.addRouter(pathRouter)
// 如果是为route添加一个children路由，那么可以传入对应的name
const momentRouter={
    path:"moment",
    component:()=>import("xxxx")
}
router.addRoute("home",momentRouter)
```
# 动态删除路由
- 删除路由有以下三种方式：
1. 方式一：添加一个name相同的路由；
```javascript
    router.addRoute({path:"/about",name:"about",component:About})
    // 这样会删除之前已经添加的路由,应为他们具有相同的名字并且名字必须是唯一的
     router.addRoute({path:"/home",name:"about",component:Home})
```
   1. 方式二：通过removeRoute方法，传入路由的名称；
```javascript
router.addRoute({path:"/about",name:"about",component:About})
// 删除路由
router.removeRoute("about")
```
   2. 方式三：通过addRoute方法的返回值回调；
```javascript
const removeRouter=router.addRoute({path:"/about",name:"about",component:About})
// 删除路由如果存在的话
removeRouter()
```
# 路由导航守卫
    vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。
- beforeEach
  - 两个参数
    - to :即将进入的路由route
    - from:即将离开的路由route对象
    - next : vue3不推荐使用了
        - 在Vue2中我们是通过next函数来决定如何进行跳转的；
        - 但是在Vue3中我们是通过返回值来控制的，不再推荐使用next函数，这是因为开发中很容易调用多次next；
  - 返回值:
    - false：取消当前导航
    - 不返回或者undefined：进行默认导航；
    - 返回一个路由地址：
      - 可以是一个string类型的路径；
      - 可以是一个对象，对象中包含path、query、params等信息；
# 其他导航守卫
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。