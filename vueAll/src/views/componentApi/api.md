# reactive  
    reactive会返回一个响应式数据 只支持接受一个复杂数据类型
    如果传入一个基本数据类型( string number boolean )会进行报错
# ref 
    ref会返回一个响应式对象 内部的值实在ref的value属性中被维护的 在使用时需要要通过value属性 
    在模板中使用ref的值时 ,vue会自动帮我们进行解包 所以我们不需要在模板中进行.value来使用    
# readonly
    readonly会返回原生对象的只读代理(也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不能对其进行修改)
1. 在readonly的使用过程中，有如下规则
   1. readonly返回的对象都是不允许修改的
   2. 但是经过readonly处理的原来的对象是允许被修改的
   3. 其实本质上就是readonly返回的对象的setter方法被劫持了而已
2. 应用
   1. 如父传子的时候不想让子修改数据
   2. 只希望获取不希望进行修改
# toRefs
    可以将reactive返回的对象中的属性都转成ref
```javascript
    const state=reactive({
        name:"poro",
        age:18
    })
    const{name,age}=toRef(state)
```
# toRef
    当只需要reactive对象中的一个属性转换为ref
```javascript
      const state=reactive({
        name:"poro",
        age:18
    })
    const name=toRef(state,name)
```
# isProxy
    检查对象是否是由 reactive 或 readonly创建的 proxy。
# isReactive
    检查对象是否是由 reactive创建的响应式代理
    如果该代理是 readonly 建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true
# isReadonly
    检查对象是否是由 readonly 创建的只读代理。
# toRaw
    返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。
# shallowReactive
    创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。
# shallowReadonly
    创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）。
# computed
    计算属性 当我们的某些属性是依赖其他状态时，我们可以使用计算属性来处理

### 如何使用computed
1.  接收一个getter函数，并为 getter 函数返回的值，返回一个不变的 ref 对象
2.  接收一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象

- 第一种
```javascript
const full=computed(()=>{
    return xxx+xxx
})
```
- 第二种
```javascript
const full =computed({
    get:()=>{
        return xxx+xxx
    },
    set:(newValue)=>{
        xxx=newValue[0]
        xxx=newValue[1]
    }
})
```