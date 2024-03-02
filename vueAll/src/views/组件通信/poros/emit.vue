<template>
    <div>
        我是emit
        {{ num }}
        <props @handelNum="handelNums" :num="num"></props>
    </div>
</template>

<script setup >
import { ref, reactive } from 'vue'
import props from "./props.vue"

const num = ref(0)
const handelNums = (nums) => {

    num.value+=nums
}
</script>
<style scoped></style>