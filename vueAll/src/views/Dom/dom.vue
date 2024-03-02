<template>
    <div></div>
    dom获取
    <domChildren ref="children"></domChildren>
</template>

<script setup >
import { ref, reactive,nextTick} from 'vue'
import domChildren from './domChildren.vue';
const children=ref()
const domFu = async () => {
    await nextTick()
    console.log(children.value)
}
domFu()

nextTick(()=>{
    console.log(children.value)
})

</script>
<style scoped></style>