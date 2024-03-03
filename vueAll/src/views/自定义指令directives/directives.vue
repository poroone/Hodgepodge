<template>
    <div>
        <button v-poro:info.aaa.bbb.ccc.poro="{ name: 'poro', age: 18 }">点我</button>
        <!-- 节流 -->
        <input type="text" v-throttle="{ fn: handleInput, event: 'input', delay: 1000 }" v-model="obj.hello">
        <!-- 防抖 -->
        <button v-debounce="{ fn: handleClick, event: 'click', delay: 200 }">防抖</button>

    </div>
    <div>
        <button @click.stop="showModal">点击显示弹窗</button>
        <div class="modal" v-hide="{ fn: cancleModal }" v-if="isShowModal">
            <p>我是弹窗</p>
            <button @click.stop="cancleModal">关闭</button>
        </div>

    </div>
</template>

<script setup >
import { ref, reactive, onMounted } from 'vue'

const vPoro = {
    mounted(el, binding) {
        console.log(el, binding)
    },
    beforeUpdate(el, binding) {
        console.log(el, binding)
    },
}


// 弹窗
let isShowModal = ref(false)
const showModal = () => {
    isShowModal.value = true;
}
const cancleModal = () => {
    console.log('cancleModal');
    isShowModal.value = false;
}



const inputRef = ref(null)

const obj = reactive({
    hello: '',
    world: ''
})

// 默认
// onMounted(() => {
//     inputRef.value.focus()
// })
// 通过局部指令
// 节流自定义指令
const handleInput = () => {
    console.log('节流输入框的值：', obj.hello);
}
const vThrottle = {
    mounted(el, binding) {
        console.log(el, binding)
        if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
        let delay = 200;
        el.timer = null;
        el.handler = function () {
            if (el.timer) return
            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments)
                el.timer = null;
            }, binding.value.delay || delay);
        }
        el.addEventListener(binding.value.event, el.handler)
    },
    beforeUnmount(el, binding) {
        if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler)
    }
}



// 防抖
const handleClick = () => {
    console.log('防抖点击');
}
const vDebounce = {
    mounted(el, binding) {
        // 至少需要回调函数以及监听事件类型
        if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
        let delay = 200; // 默认延迟时间
        el.timer = null;
        el.handler = function () {
            if (el.timer) {
                clearTimeout(el.timer);
                el.timer = null;
            };
            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments)
                el.timer = null;
            }, binding.value.delay || delay);
        }
        el.addEventListener(binding.value.event, el.handler)
    },
    // 元素卸载前清理定时器并且移除监听事件
    beforeUnmount(el, binding) {
        if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler)
    }
}





</script>
<style scoped></style>