<template>
    <div>我没被缓存</div>
    <div>{{ num }}</div>
    <button @click="add">add</button>
</template>

<script setup>
import { ref, reactive } from 'vue'
const num = ref(1)
const add = () => {
    num.value++
}
</script>
<script>
export default {
    name: 'keep1'
}
</script>
<style scoped></style>