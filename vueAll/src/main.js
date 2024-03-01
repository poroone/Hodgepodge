import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app=createApp(App)
// 全局mixin
// app.mixin({
//     created(){
//         console.log("进入")
//     }
// })
app.use(store).use(router).mount('#app')
