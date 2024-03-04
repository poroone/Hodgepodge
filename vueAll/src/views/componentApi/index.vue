<template>
    <div>

        <component :is='name'></component>
        <button @click="call">切换</button>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from './api.vue'
import api2 from './api2.vue'
const name = ref(api)
const call = () => {
    name.value = (name.value.name == "api" ? api2 : api)
}
</script>
<style scoped></style>