<template>
    <div>{{ full }}</div>
    <div>{{ fullNum }}</div>
    <button @click="add">++</button>
    <button @click="stop">停止</button>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'
const num = ref(1)
const num2 = ref(1)
const add = () => {
    num.value++
    name.push("132")
}
// function
const fullNum = computed(() => {
    return num.value + num2.value
})
// object
const full = computed({
    get: () => {
        return num.value + num2.value
    },
    set: (newValue) => {
        console.log(newValue.toString().split(""))
        const names = newValue.toString().split("")
        num.value = +names[0]
        num2.value = +names[1]
    }
})
full.value = 82
defineOptions({
    name: "api2"
})
// watch
watch(num, () => {
    return num.value
})
// watchEffect
const stopWatch = watchEffect((onInvalidate) => {
    console.log("watchEffect____执行", num.value)
    const timer = setTimeout(() => {
        console.log("请求")
    }, 2000)
    // 消除副作用函数
    onInvalidate(() => {
        clearTimeout(timer)
    })
}, {

    flush: "post"
})

// 停止侦听watch
const stop = () => {
    stopWatch()
}
const name = reactive(["abc", "asd", "poro"])
watch(() => [...name], (newValues, oldValues) => {
    console.log(newValues, oldValues)
})

</script>
<style scoped></style>