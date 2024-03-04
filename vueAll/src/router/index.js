import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: "/home/poroone"
  }, {
    path: '/home/:name',
    name: 'home',
    meta: {
      name: "homePoro"
    },
    component: HomeView
  },
  {
    path: '/about/:name/info/:id',
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
    component: () => import(/* webpackChunkName: "provide" */ '../views/组件通信/provide-inject/provide.vue')

  },
  {
    path: "/slot",
    name: "slot",
    meta: {
      keep: false,
      name: "slotPoro",
    },
    component: () => import(/* webpackChunkName: "slot" */ '../views/slot/parent.vue')
  },
  {
    path: "/keepAlive",
    name: "keepAlive",
    meta: {
      keep: true,
      name: "keepAlivePoro",
    },
    component: () => import(/* webpackChunkName: "keepAlive" */ '../views/keepAlive/keepAlive.vue')
  }, {
    path: "/asyncComponent",
    name: "asyncComponent",
    meta: {
      name: "asyncComponentPoro"
    },
    component: () => import(/* webpackChunkName: "asyncComponent" */ '../views/分包/defineAsyncComponent.vue')
  }, {
    path: "/props",
    name: "props",
    meta: {
      name: "propsPoro"
    },
    component: () => import(/* webpackChunkName: "props" */ '../views/组件通信/poros/emit.vue')
  }, {
    path: "/dom",
    name: "dom",
    meta: {
      name: "domPoro"
    },
    component: () => import(/* webpackChunkName: "dom" */ '../views/Dom/dom.vue')
  }, {
    path: "/mixin",
    name: "mixin",
    meta: {
      name: "mixinPoro"
    },
    component: () => import(/* webpackChunkName: "mixin" */ '../views/Mixin/mixin.vue')
  }, {
    path: "/transition",
    name: "transition",
    meta: {
      name: "transitionPoro"
    },
    component: () => import(/* webpackChunkName: "transition" */ '../views/动画Transition/transition.vue')
  }, {
    path: "/api",
    name: "api",
    meta: {
      name: "apiPoro"
    },
    component: () => import(/* webpackChunkName: "api" */ '../views/componentApi/index.vue')
  }, {
    path: "/hooks",
    name: "hooks",
    meta: {
      name: "hooksPoro"
    },
    component: () => import(/* webpackChunkName: "hooks" */ '../views/hook/index.vue')
  }, {
    path: "/hFunction",
    name: "hFunction",
    meta: {
      name: "h函数"
    },
    component: () => import(/* webpackChunkName: "hFunction" */ '../views/h函数/h.vue')
  }, {
    path: "/directive",
    name: "directive",
    meta: {
      name: "自定义指令"
    },
    component: () => import(/* webpackChunkName: "directive" */ '../views/自定义指令directives/directives.vue')
  }, {
    path: "/router/:name",
    name: "router",
    component: () => import(/* webpackChunkName error*/ "../views/router/index.vue")
  }, {
    path: "/:pathMatch(.*)",
    name: "error",
    component: () => import(/* webpackChunkName error*/ "../views/errorpath.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
