<template>

<div>我是子元素</div>

</template>

<script setup lang='ts'>
import {ref,reactive} from 'vue' 
defineExpose({num:132})
defineOptions({
    name:"DOMchildren"
})
</script>
<style scoped>

</style>