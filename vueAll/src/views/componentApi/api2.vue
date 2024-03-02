<template>
    <div>{{ full }}</div>
    <div>{{ fullNum }}</div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch } from 'vue'
const num = ref(1)
const num2 = ref(1)
// function
const fullNum=computed(()=>{
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
</script>
<style scoped></style>