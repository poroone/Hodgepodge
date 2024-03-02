<template>
    <div>
        <transition name="fade" type="transition" appear out-in>
            <h1 v-if="show">你好</h1>
        </transition>
        <transition >
            <h2 v-if="show" >再见</h2>
        </transition>

        <button @click="show = !show">123</button>
    </div>
</template>

<script setup>
import { ref, reactive, Transition } from 'vue'
const show = ref(true)
</script>
<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s ease;
    animation: bounce 1s;
}

.v-enter-from,
.v-leave-to {}

.v-enter-to,
.v-leave-from {}

.v-enter-active,
.v-leave-active {
    animation: bounce 1s;
}

@keyframes bounce {
    0% {
        transform: scale(0)
    }

    50% {
        transform: scale(2)
    }

    100% {
        transform: scale(1)
    }
}
</style>