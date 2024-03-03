import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      name: "homePoro"
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      keep: false,
      name: "aboutPoro"
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
    meta: {
      keep: false,
      name: "providePoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/组件通信/provide-inject/provide.vue')

  },
  {
    path: "/slot",
    name: "slot",
    meta: {
      keep: false,
      name: "slotPoro",
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/slot/parent.vue')
  },
  {
    path: "/keepAlive",
    name: "keepAlive",
    meta: {
      keep: true,
      name: "keepAlivePoro",
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/keepAlive/keepAlive.vue')
  }, {
    path: "/asyncComponent",
    name: "asyncComponent",
    meta: {
      name: "asyncComponentPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/分包/defineAsyncComponent.vue')
  }, {
    path: "/props",
    name: "props",
    meta: {
      name: "propsPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/组件通信/poros/emit.vue')
  }, {
    path: "/dom",
    name: "dom",
    meta: {
      name: "domPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Dom/dom.vue')
  }, {
    path: "/mixin",
    name: "mixin",
    meta: {
      name: "mixinPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Mixin/mixin.vue')
  }, {
    path: "/transition",
    name: "transition",
    meta: {
      name: "transitionPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/动画Transition/transition.vue')
  }, {
    path: "/api",
    name: "api",
    meta: {
      name: "apiPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/componentApi/index.vue')
  }, {
    path: "/hooks",
    name: "hooks",
    meta: {
      name: "hooksPoro"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/hook/index.vue')
  }, {
    path: "/hFunction",
    name: "hFunction",
    meta: {
      name: "h函数"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/h函数/h.vue')
  }, {
    path: "/directive",
    name: "directive",
    meta: {
      name: "自定义指令"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/自定义指令directives/directives.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
