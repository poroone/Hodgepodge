<template>
    <div>
        {{ counter }}
        <my-div />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, h, Ref } from 'vue'
import hcomponent from './hcomponent.vue'
const counter = ref(0)
const increment = () => {
    console.log("132", counter.value)
    counter.value++
}
const decrement = () => {
    console.log("132", counter.value)
    counter.value--
}

const MyDiv = () => h("div", { class: "poro" },
    [
        h("h2", null, `当前计数:${counter.value}`),
        h("button", { onclick: increment }, "++"),
        h("button", { onclick: () => counter.value-- }, "--"),
        h(hcomponent)
    ])

</script>

<style scoped></style>