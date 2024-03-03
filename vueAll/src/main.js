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

// 全局自定义指令
// app.directive('focus', {
//     mounted(el) {
//       el.focus();
//     }
//   })
app.use(store).use(router).mount('#app')
