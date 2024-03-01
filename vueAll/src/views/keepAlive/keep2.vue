<template>
  <div>我被缓存了</div>
  <div>{{ num }}</div>
  <button @click="add">add</button>
</template>

<script setup>
import { ref, reactive, onActivated, onDeactivated,onUpdated,onBeforeMount,onMounted,onBeforeUnmount,onUnmounted }from 'vue'
const num = ref(1)
const myComponent = ref(null)
const add = () => {
  num.value++
}
onBeforeMount(()=>{
  console.log("组件组件挂载前")
})
onMounted(()=>{
  console.log("组件组件挂载后")
})
onBeforeUnmount(()=>{
  console.log("组件卸载前")
})
onUnmounted(()=>{
  console.log("组件卸载后")
})
onActivated(()=>{
  console.log("进入")
}) 
onUpdated(() => {
  console.log("更新")
}),
onDeactivated(()=>{
  // myComponent.value.$destroy()
  console.log("离开")
  
})
defineOptions({
  name: 'keep2'
})
</script>

<style scoped></style>