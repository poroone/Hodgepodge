<template>
        默认插槽
        <div>开始</div>
        <slot></slot>
        <div>结束</div>
        <hr />
        具名插槽
        <div>开始</div>
        <slot name="slotName2"></slot>
        <div>结束</div>
        <hr />
        动态插槽
        <div>开始</div>
        <slot name="slotName3"></slot>
        <div>结束</div>
        <hr />
        作用域插槽
        <div>开始</div>
        <template v-for="item in array" :key="item">
                <slot name="poro" :index="index" :item="item"></slot>
        </template>
        <div>结束</div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue'
const props = defineProps({
        array: {
                type: Array,
                default: () => []
        }
})
</script>
<style scoped></style>