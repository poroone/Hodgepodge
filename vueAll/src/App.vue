<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
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
  </nav>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.path"></component>
    </keep-alive>
  </router-view>
</template>
<script setup>
// import { watch } from "vue"
// import route from "./router";
// import useTitle from "./views/hook/hooks/useTitle";
// watch(() => route.currentRoute.value, (newValue) => {
//   console.log("watch", newValue)
//   useTitle(newValue.meta.name)

// },{immediate:true})
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
