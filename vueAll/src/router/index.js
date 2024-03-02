import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta:{
      keep:false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: "/provide",
    name: "provide",
    meta:{
      keep:false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/组件通信/provide-inject/provide.vue')

  },
  {
    path:"/slot",
    name:"slot",
    meta:{
      keep:false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/slot/parent.vue')
  },
  {
    path:"/keepAlive",
    name:"keepAlive",
    meta:{
      keep:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/keepAlive/keepAlive.vue')
  },{
    path:"/asyncComponent",
    name:"asyncComponent",
    component: () => import(/* webpackChunkName: "about" */ '../views/分包/defineAsyncComponent.vue')
  },{
    path:"/props",
    name:"props",
    component: () => import(/* webpackChunkName: "about" */ '../views/组件通信/poros/emit.vue')
  },{
    path:"/dom",
    name:"dom",
    component: () => import(/* webpackChunkName: "about" */ '../views/Dom/dom.vue')
  },{
    path:"/mixin",
    name:"mixin",
    component: () => import(/* webpackChunkName: "about" */ '../views/Mixin/mixin.vue')
  },{
    path:"/transition",
    name:"transition",
    component: () => import(/* webpackChunkName: "about" */ '../views/动画Transition/transition.vue')
  },{
    path:"/api",
    name:"api",
    component: () => import(/* webpackChunkName: "about" */ '../views/componentApi/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
