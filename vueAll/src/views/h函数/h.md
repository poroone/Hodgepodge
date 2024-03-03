# h函数 
    vue推荐在绝大数情况下使用模板(template)来创建HTML，然后一些特殊的场景，你真的需要JavaScript的完全编程的能力，这个时候你可以使用 渲染函数 h函数 ，它比模板更接近编译器
- vue在生成真实Dom之前 会将我们的节点转换为VNode,而VNode组合在一起形成树tree结构就是虚拟Dom 
- template中编写的html也是使用渲染函数生成对应的VNode
- 可以在js中使用h函数 
  - h函数是一个用于创建vnode的一个函数 (createVNode)
### h函数使用
h函数接收三个参数.
1. 第一个参数 string 标签名 | object 组件 | function 异步组件 或函数式组件 必选的
2. 第二个参数 {object} attribute prop 时间 可选的
3. 第三个参数 string | Array | Object 如果有子元素使用h()创建 或使用字符串获取文本vNode 或有插槽的对象 
- 如果没有props，那么通常可以将children作为第二个参数传入；
- 如果会产生歧义，可以将null作为第二个参数传入，将children作为第三个参数传入；
```javascript
    h("div",{class:"poro"},"hello poro")
```
### h函数的基本使用
1. render函数选项中
2. setup函数选项中
```javascript
export default {
    render(){
        return
         h("div",{class:"app"},"Hello")
    }
}

export default {
    setup(){
        return ()=>h("div",{class:"app"},"Hello")
    }
}
```