<template>
    <div></div>
    dom获取
    <domChildren ref="children"></domChildren>
</template>

<script setup >
import { ref, reactive,nextTick} from 'vue'
import domChildren from './domChildren.vue';
import useTitle from '../hook/hooks/useTitle';
const children=ref()
const name="domPoro"
const domFu = async () => {
    await nextTick()
    console.log(children.value)
}
domFu()

useTitle(name)
nextTick(()=>{
    console.log(children.value)
})

</script>
<style scoped></style>