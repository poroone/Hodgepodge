<template>
    <div></div>
    <button @click="hello">hello</button>
</template>

<!-- <script setup >
import {ref,reactive} from 'vue' 

</script> -->
<script >

import helloMixin from './mixin';

export default {

    mixins: [helloMixin]
}

</script>
<style scoped></style>