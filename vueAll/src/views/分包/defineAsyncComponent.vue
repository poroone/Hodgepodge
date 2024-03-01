<template>

<div>
    <home></home>
    <br>
    <about></about>
    <button @click="handler">handler</button>>
</div>

</template>

<script setup >
import {ref,reactive,defineAsyncComponent} from 'vue' 
import loading from '../loading.vue'
const home=defineAsyncComponent(()=>import('../HomeView.vue'))
const error=defineAsyncComponent(()=>import('../error.vue'))
const about=defineAsyncComponent({
    // 工厂函数
    loader:()=>import("../AboutView.vue"),
    // 加载过程中显示的组件
    loadingComponent:loading,
    // 加载失败显示的组件
    errorComponent:error,
    // 在显示loadingComponent 之前的延迟 | 默认200毫秒
    delay:20,
    // 如果提供了timeout ,并且加载组件的时间超过了设定值,将显示错误组件
    // 默认值:Infinity(即永不超时,单位ms)
    timeout:10,
    // 定义组件是否可挂起 | 默认值:true
    // suspensible:true
})

const handler =($parent)=>{
console.log($parent)
}


</script>
<style scoped>

</style>