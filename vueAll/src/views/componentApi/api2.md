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

# watch
   watch需要侦听特定的数据源，并在回调函数中执行副作用

   默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调；       
  - watch 第一次不会直接执行 可以通过immediate 进行设置默认第一次执行
  - 更具体的说明那些状态发生变化时,触发侦听器的执行
  - 访问侦听状态变化前后的值
  - 接收三个参数 第一个是侦听的值 第二个是回调函数 第三个是options
### 侦听单个数据源

```javaScript
// 传入一个函数,但是该getter函数必须引用可响应式的对象（比如reactive或者ref）；
    const state=reactive({
        name::"poro"
    })
    watch(()=>state.name,(newValue,oldValue)=>{
        console.log(newValue,oldValue)
    })
// 直接写入一个可响应式的对象，reactive或者ref（比较常用的是ref）
 const name=ref("poro")
  watch(name,(newValue,oldValue)=>{
        console.log(newValue,oldValue)
    })
```
### 侦听多个数据源
    侦听器可以使用数组同时侦听多个源
```javascript
    const name=ref("poro")
    const age=ref(18)
    watch([name,age],(newValues,oldValues)=>{
            console.log(newValues,oldValues)
    })
```
### 侦听响应式对象
如果我们希望侦听一个数组或者对象，那么可以使用一个getter函数，并且对可响应对象进行解构
```javascript
    const name=reactive(["abc","asd","poro"])
    watch(()=>[...name],(newValues,oldValues)=>{
 console.log(newValues,oldValues)
    })
```
### watch 的options
```javascript
    watch(XXX,()=>{

    },{
        deep:true, //深度侦听
        immediate:true, //默认第一次执行
        once:true //只执行一次
    })
```
# watchEffect
    当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 watchEffect
```javascript
// 侦听
    const stopwatch=watchEffect((onInvalidate,options)=>{
    console.log(XXX,ZZZZ)
    },{
        onces
        flush:" pre | post | sync " //pre 默认会在元素华仔或更新之前执行  | post Dom挂载之后执行 | sync 强制同步执行
    })
    // 停止侦听
    stopwatch()
```
