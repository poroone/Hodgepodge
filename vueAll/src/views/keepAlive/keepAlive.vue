<template>
    <div>
        <p>动态组件</p> 
        <keep-alive include="keep2">
            <component :is="componentId" />
        </keep-alive>
 
        <p>组件切换</p> 
        <keep-alive include="keep2">
            <keep1 v-if="falg"></keep1>
            <keep2 v-else></keep2>
        </keep-alive>
        <div>
            <p> {{ numk }}</p>
            <button @click="add">++</button>
        </div>
        <button @click="btn">切换1</button>
        <button @click="btn2">切换2</button>
    </div>
</template>

<script setup >
import { ref, reactive } from 'vue'
import keep1 from "./keep1.vue"
import keep2 from "./keep2.vue"
const numk = ref(0)
console.log(keep2)
const componentId = ref(keep1)
const flag = ref(true)
const add = () => {
    numk.value++
    flag.value = !flag.value
}
const btn = () => {
    componentId.value = keep1
}
const btn2 = () => {
    componentId.value = keep2
}
defineOptions({
    name: 'keepAlive'
})
</script>

<style scoped></style>