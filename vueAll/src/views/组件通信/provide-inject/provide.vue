<template>
  <div>

    <!-- provide -->
    <ProvideMode></ProvideMode>
  </div>
</template>
<!-- setup -->
<!-- <script setup>
import { ref, reactive, provide } from "vue";
import ProvideMode from "./computed/provide-inject/provide-mode.vue";
provide("names", "我是provide");
</script> -->


<!-- option -->
<script>
import ProvideMode from "./provide-mode.vue";
import { computed } from "vue";
export default {
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
    return{
      name:this.name,
      length:computed(()=>this.name.length) //vue3的
    }
  },
};
</script>
