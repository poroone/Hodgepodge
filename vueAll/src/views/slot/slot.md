# 插槽

 1. 插槽的使用过程其实是抽取共性、预留不同；
 2. 我们会将共同的元素、内容依然在组件内进行封装；
 3. 同时会将不同的元素使用slot作为占位，让外部决定到底显示什么样的元素；
 4. 该插槽插入什么内容取决于父组件如何使用；
 5. 封装组件中，使用特殊的元素<slot>就可以为封装组件开启一个插槽；
 6. 使用它们：我们可以插入普通的内容、html元素、组件元素，都可以是可以的；

## 插槽的基本使用   
 1. 默认插槽 默认名字是default 
 2. 具名插槽 v-slot:XXXX | #XXX
 3. 作用域插槽  插槽的值可以通过自定义属性进行传值使用者通过 v-slot:xxx="slotProps" | #xxx="slotProps" |如果是默认插槽可以直接v-slot="slotProps" 获取slot中的props从而进行使用
