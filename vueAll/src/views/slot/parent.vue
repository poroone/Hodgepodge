<template>
    <div>
        <SlotVue :array="array">
            <template #>
                <p>我是默认插槽内容1</p>
            </template>

            <template #slotName2>
                <div>
                    我是具名插槽内容2
                </div>
            </template>

            <template v-slot:[name]>
                <p>我是默认插槽内容3</p>
            </template>

            <template #poro="slotProps">
                <div>
                    <p>
                     
                        {{ slotProps.item }}
                        {{ slotProps.index }}
                    </p>
                    <p>我是默认插槽内容4</p>
                </div>

            </template>
        </SlotVue>
    </div>
</template>
    
<script setup>
import { ref, reactive, } from 'vue'
import SlotVue from "./SlotVue.vue"
const name = "slotName3"
const array = ["PORO", "KOKO", "TOTO", "COCO"]

</script>
<style scoped></style>