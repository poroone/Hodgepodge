<template>
  <nav>
    <router-link to="/home/poro">Home</router-link> |
    <router-link to="/about/poroone/info/233">About</router-link> |
    <router-link to="/provide">provide</router-link> |
    <router-link to="/slot">slot</router-link> |
    <router-link to="/keepAlive">keep</router-link> |
    <router-link to="/asyncComponent">asyncComponent</router-link> |
    <router-link to="/props">props</router-link> |
    <router-link to="/dom">dom</router-link> |
    <router-link to="/mixin">mixin</router-link> |
    <router-link to="/transition">transition</router-link> |
    <router-link to="/api">api</router-link> |
    <router-link to="/hooks">hooks</router-link> |
    <router-link to="/hFunction">hFunction</router-link> |
    <router-link to="/directive">directive</router-link> |
    <router-link to="/router/poro">routerParams</router-link> |
    <button @click="router">routerQuery </button>
    <router-link to="/error">error</router-link> |
    <router-link to="/error/user/123">error</router-link> |

    <!-- <router-link to="/dom" v-slot="{ href, route, navigate, isActive, isExactActive }"> -->
    <!-- <div>
        <p>href ------{{ href }}</p>
        <p>route ------{{ route }}</p>
        <p>navigate ------{{ navigate }}</p>
        <p>isActive ------{{ isActive }}</p>
        <p>isExactActive ------{{ isExactActive }}</p>
      </div> -->
    <!-- </router-link> -->


  </nav>

  <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
  </router-view>
</template>
<script setup>
// import { watch } from "vue"
import { prototype } from "html-webpack-plugin";
import { useRouter } from "vue-router";
// import useTitle from "./views/hook/hooks/useTitle";
// watch(() => route.currentRoute.value, (newValue) => {
//   console.log("watch", newValue)
//   useTitle(newValue.meta.name)

// },{immediate:true})
const route = useRouter()
const router = () => {
  route.replace({
    path: "/router/poro",
    query: { name: "poro", age: 18 }
  })
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
