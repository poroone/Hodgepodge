<template>
    我是props
    <div></div>
    <button @click="add">改变父组件的num</button>
</template>
    
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Emit from './emit.vue';
const props = defineProps<{
    num?: number
    str: string
}>()
const emits=defineEmits<{
    (event: "handelNum", num: number): void
}>()
console.log(props.num)
// const props2=defineProps({
//     num:Number
// })
// console.log(props2.num)
const add=()=>{
    console.log(132)
    emits("handelNum",1)
}
defineOptions({
    name: "props"
})
</script>
<style scoped></style>