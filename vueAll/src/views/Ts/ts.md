# ts
    1. TS是为了弥补JavaScript类型约束上的缺陷
    2.TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码。
    3.TypeScript最终会被编译成JavaScript来运行
### 使用    
    声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解；
        var/let/const 标识符: 数据类型 = 赋值;
        
```javascript
 ts中不推荐使用var主要原因和ES6升级后let和var的区别是一样的，var是没有块级作用域的，会引起很多的问题
    var xxx:string="123"
    let xxx:number=123
    const xxx:boolean=true
```
### 类型
1. any
    - 无法确定一个变量的类型,可以使用any类型
    - any 可以接收任意类型
    - 可以给any类型的变量赋值任何的值，比如数字、字符串的值；
    - 可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法；
```javascript
    let a:any=123
        a="123"
        a=true
    let a:any[]=["123",123,true]
```
2. unknown
  - 用于描述类型不确定的变量。
```javascript
    let result:unknown
    result=():string=>{
        return "str"
    }
    result=():number=>{
        return 123
    }
```
3. void
  - void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型：
  - 可以将null和undefined赋值给void类型，也就是函数可以返回null或者undefined
```javascript
// 不写的话默认void
    function num=(num1:number,num2:number){
        console.log(num1 , num2)
    }
    // 也可以来指定返回值是void：
    function num=(num1:number,num2:number):void{
        console.log(num1 , num2)
    }
```
4. never
  - 表示永远不会发生值的类型，比如一个函数
```javascript   
    function xxxfn():never{

    }
```
5. tuple
  - 数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。
  - 元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；
```javascript
const info=[string,number,number]=["poro",12,13]
const info1=info[0] // poro 并指知道类型一定是一个string
const info1=info[1] //12 并且知道该类型一定是一个number

const info=(string|number)[]=["poro",12,13]
const info1=info[0] //不能确定类型

// 使用场景

function useState:<T>(state:<T>):[T,(newState:T)=>void]{
    const currentState=state
    const changeState=(newState: T)=>{
        currentState=newState   
    }
    return [currentState,changeState]
}
const [currentState,changeState]=useState(10)
```
6. number
  - number支持整数类型（int）和浮点型（double）
  - 和es6一样支持二进制、八进制、十六进制的表示：
```javascript

    let num:number=100 //十进制 整数
        num=100.1 //浮点
        num=0b100 //二进制
        num=0o555//八进制
        num=0xf23 //十六进制
```
7. string
  - string类型是字符串类型，可以使用单引号或者双引号表示
  - 同时也支持ES6的模板字符串来拼接变量和字符串
``` javascript
    let str:string="xxx"
        str=`数字是${num}`
```
8. boolean
  - boolean类型只有两个取值：true和false
```javascript
    let flag=true
        flag=false
        flag=20<30
```
9. Array
```javascript
    let strArray:string[]=["12","23","34"]
    let array:Array<string>=["12","23","34"]
```
10. Object
```javascript
 let obj:object={
    name:"poro",
    age:18
 }
```
11. Symbol
```javascript
const n1:symbol=Symbol("name")
const n2:symbol=Symbol("name")
const symbol={
    [n1]:"poro",
    [n2]:"poro"
}
```
12. null undefined
```javascript
    let null:null=null
    let undefined:undefined=undefined
```
# 函数参数的类型
    TypeScript允许我们指定函数的参数和返回值的类型
```javascript
    function names(name:string) {
        console.log(name.toUpperCase())
    }
    names("poro") //PORO
    names(123) //报错 参数应该是一个string 而不是number
```
# 函数的返回值类型
    1. 也可以添加返回值的类型注解，这个注解出现在函数列表的后面
    2. 通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的返回类型：
```javascript
    function names(name:string):string {
        return name.toUpperCase()
    }
```
# 匿名函数的参数
    1.匿名函数与函数声明会有一些不同
    2.当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；p该函数的参数会自动指定类型；
```javascript
    const names=["poro","dbPoro","Thebest"]
    // 并没有指定item的类型，但是item是一个string类型：
    // 1.这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型；
    // 2.这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型；
    names.forEach(item=>{
        console.log(item.toUpperCase())
    })
```
# 对象类型
    限定一个函数接受的参数是一个对象
```javascript
    // 1.在对象我们可以添加属性，并且告知TypeScript该属性需要是什么类型
    // 2.属性之间可以使用 , 或者 ; 来分割，最后一个分隔符是可选的；
    // 3.每个属性的类型部分也是可选的，如果不指定，那么就是any类型；
    function names(item:{name:string;age:number}) {
        console.log(item.name)
        console.log(item.age)
    }
    names({name:"poro",age:18})
    
```
# 可选类型
    对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个?
    可选类型可以看做是 类型 和 undefined 的联合类型：
```javascript

   function names(item:{name:string,age:number,flag?:boolean}) {
        console.log(item.name)
        console.log(item.age)
        console.log(item.flag)
    }
    names({name:"poro",age:18})
    names({name:"poro",age:18,flag:true})
     names({name:"poro",age:18,undefined})
```
# 联合类型
    联合类型是由两个或者多个其他类型组成的类型；
    表示可以是这些类型中的任何一个值；
    联合类型中的每一个类型被称之为联合成员
```javascript
    function names(id: string | number) {
        console.log(id)
    }
    names("12")
    names(12)
```
# 使用联合类型
    1.传入给一个联合类型的值是非常简单的：只要保证是联合类型中的某一个类型的值即可
    2.但是我们拿到这个值之后，我们应该如何使用它呢？因为它可能是任何一种类型。
    3.比如我们拿到的值可能是string或者number，我们就不能对其调用string上的一些方法；
```javascript
    function print(id:string | number){
        if(typeof id === 'string'){
            return id.toUpperCase()
        }else{
           return id
        }
    }
```
# 类型别名
    1. 可以通过在类型注解中编写 对象类型 和 联合类型，但是当我们想要多次在其他地方使用时，就要编写多次。
    2. 我们可以给对象类型起一个别名：
```javascript
    type names={
        name:string
        age:number
    }
    function names(item:names) {
        console.log(item.name)
        console.log(item.age)
    }

    type ID=number | string
    function names(id:ID) {
        console.log(id)
    }
```
# 断言 as
    1. 有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言
    2. 比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它具体的类型：
```javascript
const imgEl=document.querySelect("img") as HTMLImageElement;
el.src="xxx"

const name=("poro" as unknown) as  number
```
# 非空断言
    非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测
```javascript
// 传入的message有可能是为undefined的，这个时候是不能执行方法的；
// 但是，我们确定传入的参数是有值的，这个时候我们可以使用非空类型断言
const message(message:string){
    console.log(message!.toUpperCase())

}
message("poro")
```
# 可选链的使用
    可选链事实上并不是TypeScript独有的特性，它是ES11（ES2020）中增加的特性
    1. 可选链使用可选链操作符 ?.；
    2. 它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行；
    3. 虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更版本；
```javascript
    type person={
        name:string
        obj?:{
            name:string
            age?:number
            gridObj?:{
                name:string
            }
        }
    }

    const info:person={
        name:"poro",
        obj:{
            name:"Thebest",
            gridObj:{
                name:"poluo"
            }
        }
    }
    console.log(info?.obj?.name)
    console.log(info?.obj?.age)
    console.log(info?.obj?.gridObj?.name)
```
# ??和!!的作用
    !!操作符：
        将一个其他类型转换成boolean类型；
        类似于Boolean(变量)的方式；
    ??操作符：
        它是ES11增加的新特性；
        空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数；
```javascript
    const message=""
        console.log(Boolean(message))
        console.log(!!message)
    const message="123"
     console.log(message ?? 321)
```
# 字面量类型
    以将多个类型联合在一起；
```javascript
    type message="left" |"right" |"center" 
    function changeMessage(mess:message) {
        console.log(mess) // left
    }
    changeMessage("left")
```
# 字面量推理
```javascript
const message ={
    name:"PORO",
    str:"post"
} as const
function changeMessage(name:string, str:"GET"|"POST") {
    console.log(name,str)
}
changeMessage(message.name,message.str) //会报错应为 message中的str不是字面量二十string 

```
# as const 
    as const 是 TypeScript 中的一个用于修饰符，它可以被用来修改类型推断的行为。
- 当 as const 修饰符用在变量声明或表达式的类型上时，它会强制 TypeScript 将变量或表达式的类型视为不可变的（immutable）。这意味着，如果你尝试对变量或表达式进行修改，TypeScript 会报错。
```javascript
const foo = ['a', 'b'] as const;
foo.push('c');  // TypeScript 会报错，因为 foo 类型被声明为不可变的

const bar = { x: 1, y: 2 } as const;
bar.x = 3;  // TypeScript 会报错，因为 bar 类型被声明为不可变的

```
- as const 修饰符还可以用来修改对象字面量和数组字面量的类型推断。在这种情况下，as const 会强制 TypeScript 将对象字面量或数组字面量的类型推断为不可变的，即使没有显式地指定类型。
```javascript
const foo = ['a', 'b'] as const;  // 等价于 const foo: ['a', 'b'] = ['a', 'b']

const bar = { x: 1, y: 2 } as const;  // 等价于 const bar: { x: 1, y: 2 } = { x: 1, y: 2 }
```
TypeScript 会将 foo 和 bar 的类型推断为不可变的数组和对象，即使没有显式地指定类型。


