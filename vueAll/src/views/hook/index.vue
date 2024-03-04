<template>
    <div>{{ counter }}</div>
    <button @click="increment">++</button>
    <button @click="decrement">--</button>
    <button @click="Multment(2)">**</button>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</template>

<script setup>

import hook from './hooks/index.js'
const { useCounter, useTitle, useScroolPosition, useMousePosition } = hook()
const name = "hooksporo"
const { counter,
    increment,
    decrement, Multment } = useCounter()
useTitle(name)
console.log(useScroolPosition())
console.log(useMousePosition())
defineOptions({
    name
})

</script>
<style scoped></style>