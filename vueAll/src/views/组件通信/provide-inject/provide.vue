<template>
  <div>

    <!-- provide -->
    <Provide-mode></Provide-mode>
  </div>
</template>
<!-- setup -->
<script setup>
import { ref, reactive, provide } from "vue";
import ProvideMode from "./provideMode.vue";
const info=reactive({
  name:"poro"
})
const infoName=(name)=>{
info.name=name
}
provide("infoName", infoName);
provide("info", info);
provide("names", "我是provide");
</script>


<!-- option -->
<!-- <script>
import ProvideMode from "./provideMode.vue";
import { computed } from "vue";
export default {
  name: 'provide',
  components: {
    ProvideMode,
  },
  data() {
    return {
      name: "123",
    };
  },
  // provide: {
  //   name:name,
  // },
  // 使用this应该使用函数
  provide() {
    return {
      name: this.name,
      length: computed(() => this.name.length) //vue3的
    }
  },
};
</script> -->


