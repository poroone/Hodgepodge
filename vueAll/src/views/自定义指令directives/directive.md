# directive
### 自定义局部指令 
    组件中通过directive选项,只能在当前组件中使用
- 在setup中:任何以v开头的驼峰式命名的变量都可以被用作一个自定义指令，然后在模板中使用
```javascript
    <script setup>
    // 在模板中启用 v-focus
    const vFocus = {
        mounted: (el) => el.focus()
    }
    </script>

    <template>
    <input v-focus />
    </template>

```
- 使用选项式，则自定义指令需要在directives选项中注册
```javascript
<script>
export default{
  setup() {},
  directives: {
    // 指令名
    focus: {
      // 生命周期
      mounted(el) {
        // 处理DOM的逻辑
        el.focus();
      },
    }
  }
}
</script>
<template>
  <input v-focus />
</template>
```

### 自定义全局指令
app的 directive 方法，可以在任意组件中被使用
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus();
  }
})
app.mount('#app')

```



###  生命周期
- created：在绑定元素的属性前，或者事件监听器应用前调用
- beforeMount：在元素被插入到DOM前调用，例如我们想要实现输入框的自动聚焦，就不能在beforeMount钩子中实现
- mounted：在绑定元素的父组件以及自己的所有子节点都挂载完毕后调用，这个时候DOM已经渲染出来，我们实现输入框自动聚焦也是在这个钩子函数中实现
- beforeUpdate：绑定元素的父组件更新前调用
- updated：在绑定元素的父组件以及自己的所有子节点都更新完毕后调用
- beforeUnmount：绑定元素的父组件卸载前调用
- unmounted：绑定元素的父组件卸载后调用
```javascript

app.directive('focus', {
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeUnmount() {
    console.log('beforeUnmount');
  },
  unmounted() {
    console.log('unmounted');
  }
})
```
### 钩子的参数
    created(el, binding, vnode, preVnode) {}
1. el:指令绑定到的DOM元素,可以用于直接操作当前元素，默认传入钩子的就是el参数，例如我们开始实现的focus指令，就是直接操作的元素DOM
2. binding：这是一个对象，包含以下属性：
   1. value：在元素上使用指令时，传递给指令的值。例如：<div v-reverse="'hello'"></div>，传递给reserve指令的值就是hello，我们可以拿到值并做相关处理
    1. oldValue：之前的值，一般用于beforeUpate和updated钩子函数中，例如：beforeUpdate(el, {oldValue: ''})
    1. arg：传递给指令的参数，非必需，例如<div v-reverse:foo="'hello'"></div>，那么传递给指令的参数就是foo
    1. modifiers：一个由修饰符构成的对象，例如<div v-reverse.foo.bar="'hello'"></div>，那么该修饰符对象为{foo: true, bar: true}，我们经常使用到的事件修饰符，其实和这个差不多。
   2. instance：使用该指令的组件实例，注意不是DOM
   3. dir：指令的定义对象
3. vnode：绑定元素的地城VNode

4. preVnode：之前的渲染中代表指令所绑定的元素的VNode，一般用于beforeUpate和updated钩子函数中
### 指令的参数和修饰符
- info是参数的名称；
- aaa-bbb是修饰符的名称；
- 后面是传入的具体的值；
```javascript
<button v-poro:info.aaa.bbb.ccc.poro="{ name: 'poro', age: 18 }">点我</button>
    {     
        arg:"info",
        dir:{mounted: ƒ, beforeUpdate: ƒ},
        instance:Proxy(Object) {__v_skip: true},
        modifiers:{aaa: true, bbb: true, ccc: true, poro: true},
        oldValue:undefined,
        value:{"name": "poro","age": 18}
    }
```