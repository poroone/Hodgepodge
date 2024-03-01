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
        <template v-for="item,index in array" :key="item">
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
defineOptions({
        name:"SlotVue"
})
// defineSlots<{
//   	// default 是插槽名称
//     // 函数的第一个TS对象类型参数是插槽期望接收的 props 的TS类型
//     // 返回值类型目前被忽略，可以是 any，未来可能利用它来检查插槽内容
// //   default(props: { test: number}): any
// }>()
</script>

<style scoped></style>