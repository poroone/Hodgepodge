<template>
    <div>需要.value----{{ info.refs }}</div>
    <div>不需要----{{ message.refs }}</div>
</template>

<script setup lang='ts'>
import { ref, reactive, readonly, toRefs, toRef,unref,isRef,shallowRef,toRaw,isReadonly,isReactive} from 'vue'
// ref reactive
const refs = ref("我是ref")
const reactives = reactive({ b: 1 ,c:{d:2}})
const info = {
    refs
}
const message = reactive({
    refs
})
const flag=isRef(refs)
console.log("isRef----ref",flag)

const isReactives=isReactive(reactives)
console.log("isReactive----reactive",isReactives)
console.log("ref--reactive--",refs, reactives,reactives.c)

// readonly
const readonlys = readonly(refs)
// readonlys.value="123123"
const isreadonlus=isReadonly(readonlys)
console.log("readonly----",info, readonlys,isreadonlus)

// toRefs
const state = reactive({
    name: "poro",
    age: 18
})
const { name, age } = toRefs(state)
console.log("toRefs----",name.value, age.value)

// toRef
const names = toRef(state, "name")
console.log("toRef----",names)

// unrefs
const unrefs=unref(refs)
console.log("unref----",unrefs)

// isref

const flag2=isRef(reactives)
console.log("isRef----reactive",flag2)


// shallowRef
const obj=shallowRef({
    name:123,
    age:{
        name:456
    }
})
console.log("第一层有响应式",obj)
console.log("第二层有响应式",obj.value.age)

// toRaw
const raw=toRaw(reactives)
console.log("raw-----",raw)


defineOptions({
    name:"api"
})
</script>
<style scoped></style>