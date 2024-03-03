<template>
    <div>
        <div>setup provide参数:{{ names }}</div>
        <div>option provide参数:{{ name }}长度{{ length }}</div>
    </div>
</template>
<!-- setup -->
<script setup >
import { ref, reactive, inject } from "vue";
const names = inject("names");
const infoName = inject("infoName");
const info = inject("info");
console.log(info)
infoName("poro你好")
console.log(info)
console.log(names);
</script>

<!-- option -->
<script  >
export default {
  inject: ["name","length"],
};
</script>

