# 类型缩小
1. 我们可以通过类似于 typeof padding === "number" 的判断语句，来改变TypeScript的执行路径；
1. 在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为 缩小;
1. 而我们编写的 typeof padding === "number 可以称之为 类型保护（type guards）
## 常见的类型保护又如下几种
- typeof
- (=== , !==)
- instanceof
- in 
### typeof 
```javascript
type ID = number | string
    function printID(id:ID){
        if(typeof id === "number"){
            console.log("number"+id)
        }else{
            console.log("string"+id)
        }
    }
```
### 平等缩小
可以使用Switch或者相等的一些运算符来表达相等性（比如===, !==, ==, and != ）
```javascript
    type Direction = "letf" |"right" | "center"
    switch(direction:Direction){
        case "left":
            console.log("left"+direction)
            break
        case "right":
            console.log("right"+direction)
            break
        case "center":
            console.log("center"+direction)
            break
    }
```
# instanceof
JavaScript 有一个运算符来检查一个值是否是另一个值的“实例”
```javascript
function printValue(date:Date|string){
    if(date instanceof Date){
        console.log(data.toUpperCase())
    }else{
        console.log(date)
    }
}
```
# in
1. Javascript 有一个运算符，用于确定对象是否具有带名称的属性：in运算符
2. 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true；
```javascript
    const obj = reactive({
    name: "poro",
    age: 18
})
console.log("age" in obj)
// -------------------------------
type Fish={swim:()=>void}
type Dog=(run:()=>void)
function move(animal:Fish |Dog){
    if("swim" in animal ){
        animal.swim()
    }else{
        animal.run()
    }
}
```
# Typescript 函数类型
    在使用函数的过程中，函数也可以有自己的类型
    们可以编写函数类型的表达式（Function Type Expressions），来表示函数类型
```javascript
    type func=(num1:number,num2:number)=>void
    function calc(fn:func){
        console.log(fn(20,30))
    }
    function add(num1:number,num2:number){
        return num1+num2
    }
    function multiply(num1:number,num2:number){
         return num1*num2
    }
    calc(add) //50
    calc(multiply)//600
```
    1.在上面的语法中 (num1: number, num2: number) => void，代表的就是一个函数类型：
    2.接收两个参数的函数：num1和num2，并且都是number类型；
    3.并且这个函数是没有返回值的，所以是void
# 可选参数
    我们可以指定没写参数是可选的 
    可选类型需要在必传参数的后面
```javascript
// 这个时候y的类型就是 number | undefined
    function foo(x:number,y?number){
        console.log(x,y)
    }
```
# 默认参数
从ES6开始，JavaScript是支持默认参数的，TypeScript也是支持默认参数的
```javascript
// 这个时候y的类型其实是 undefined 和 number 类型的联合。
    function foo(x:number,y?number=6){
        console.log(x,y)
    }
```
# 剩余参数
从ES6开始，JavaScript也支持剩余参数，剩余参数语法允许我们将一个不定数量的参数放到一个数组中。
```javascript
// 这个时候y的类型其实是 undefined 和 number 类型的联合。
    function foo(...nums:number[]){
        let total=0
        for( const num in nums){
            total+=num
        }
        return total
    }
    console.log(foo(10,20,30))
    console.log(foo(10,20,30,40))
```
# 不确定的this类型
    对于某些情况来说，我们并不知道this到底是什么
```javascript
    function sayHello(){
        console.log(this.name)
    }
    const info={
        name:"hello",
        sayHello
    }
    info.sayHello()
```
- 这段代码运行会报错的
  - 这里我们再次强调一下，TypeScript进行类型检测的目的是让我们的代码更加的安全；
  - 所以这里对于 sayHello 的调用来说，我们虽然将其放到了info中，通过info去调用，this依然是指向info对象的；
  - 但是对于TypeScript编译器来说，这个代码是非常不安全的，因为我们也有可能直接调用函数，或者通过别的对象来调用函数
## 指定this的类型
这个时候，通常TypeScript会要求我们明确的指定this的类型:
```javascript
    type NameType={
        name:string
    }
    function sayHello(this:NameType) {
        console.log(this.name)
    }
```
# 函数的重载
在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？
```javascript
    function add(a1:number,a2:number):number
    function add(a1:string,a2:string):string
    function add(a1:any,a2:any):any{
        return a1+a2
    }
    console.log(add(20,30))
    console.log(add("aaa","bbb"))
```
# 联合类型和重载
    有一个需求：定义一个函数，可以传入字符串或者数组，获取它们的长度。
    方案一：使用联合类型来实现；
    方案二：实现函数重载来实现；
```javascript
1. function getLength(a:string|any[]){
    return a.length
}
2.  function getLength(a:string):number
    function getLength(a:any[]):number
    function getLength(a::any){
        return a.length
    }
//对比上面两种 在可能的情况下，尽量选择使用联合类型来实现；
```
# 类的使用
1. 在js最开始的时候需要通过函数和原型链来实现类和继承,从es6开始出现了class关键字可以更加方便地定义和使用类
2. ts也支持使用class关键字 并且还可以对类的属性和方法进行静态类型检测
3. 类的定义我们通常会使用class关键字
   1. 在面向对象的世界里，任何事物都可以使用类的结构来描述
   2. 类中包含特有的属性和方法
4. 类的定义
```javascript
    class Person{
        name!:string
        age:number
        constructor(name:string,age:number){
            this.age=age
        }
        running(){
            console.log(this.name+"running")
        }
        eating(){
            console.log(this.name+"eating")
        }
    }
```
1. 我们来定义一个Person类：
2. 使用class关键字来定义一个类；
3. 我们可以声明一些类的属性：在类的内部声明类的属性以及对应的类
   1.  如果类型没有声明，那么它们默认是any的；
   2. 我们也可以给属性设置初始化值；
   3. 在默认的strictPropertyInitialization模式下面我们的属性是必须初始化的，如果没有初始化，那么编译时就会报错；
   4. 如果我们在strictPropertyInitialization模式下确实不希望给属性初始化，可以使用 name!: string语法；
4. 类可以有自己的构造函数constructor，当我们通过new关键字创建一个实例时，构造函数会被调用；
   1. 构造函数不需要返回任何值，默认返回当前创建出来的实例；
5. 类中可以有自己的函数，定义的函数称之为方法；
#### 类的继承
   1. 面向对象的其中一大特性就是继承，继承不仅仅可以减少我们的代码量，也是多态的使用前提。
   2. 使用extends关键字来实现继承，子类中使用super来访问父类
   3. 使用Student类继承自Person
      1. Student类可以有自己的属性和方法，并且会继承Person的属性和方法；
      2. 在构造函数中，我们可以通过super来调用父类的构造方法，对父类中的属性进行初始化；
```javascript
    class Student extends Person{
        sno:number
        
        constructor(name:string,age:number,sno:number){
            super(name,age)
            this.sno=sno
        }
        studying(){
            console.log(this.name+"studying")
        }
    }
```
#### 类的成员修饰符
- 在TypeScript中，类的属性和方法支持三种修饰符： public、private、protected
    1. public 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的；
    2. private：类成员只能在类中被访问。
    3. protected：类成员在类以及子类中可以被访问
    1. public是默认的修饰符，也是可以直接访问
```javascript
// publick 是 JavaScript 中默认的，如果从对象上可以获取的东西，那也可以从它的实例上获取
// object
const myObject = {
    name: "Parwinder",
    sayMyName: function () {
        return this.name;
    }
}
console.log(myObject.name); // Parwinder
console.log(myObject.sayMyName()); // Parwinder
// class
class ObjectCreator {
    name;

    constructor(name) {
        this.name = name;
    }

    sayMyName() {
        return this.name;
    }
}

const myObject = new ObjectCreator("Parwinder");
console.log(myObject.name); // Parwinder
console.log(myObject.sayMyName()); // Parwinder

// private
class aPerson {
    private name: string
    constructor(name: string) {
        this.name = name
    }
}
// 属性“name”为私有属性，只能在类“aPerson”中访问
console.log(new aPerson("poro333").name)
class student extends aPerson {
    constructor(name: string) {
        super(name)
    }
}
// 属性“name”为私有属性，只能在类“aPerson”中访问
console.log(new student("poro333").name)
// protected 只能在类中使用
class persons {
    protected name: string

    constructor(name: string) {
        this.name=name
    }
    running(){
        // 属性“name”为私有属性，只能在类“aPerson”中访问
        // console.log(this.name+"running")
    }
}
console.log(new persons("poro233"))
// 属性“name”受保护，只能在类“persons”及其子类中访问
// console.log(new persons("poro233").name)

```
####  只读属性 readonly
果有一个属性我们不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用readonly
```javascript
    class Person{
        readonly name:string
        constructor(name:string){
            this.name=name
        }
    }
    const p=new Person("poro")
  console.log(  p.name)
//  无法为“name”赋值，因为它是只读属性。
//  p.name="123"
```
####  getters/setters
一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程，这个时候我们可以使用存取器。
```javascript
class Persong{
    private _name:string

    set name(name){
        this._name=name
    }
    get name(){
        return this._name
    }
    constructor(name:string){
        this.name=name
    }
}
    const p=new Persong("poro")
      console.log(p.name)//poro
    p.name="poroone" 
    console.log(p.name)//poroone
```
#### 静态成员
    1. 我们在类中定义的成员和方法都属于对象级别的, 在开发中, 我们有时候也需要定义类级别的成员和方法。
    2. 在TypeScript中通过关键字static来定义
```javascript
    class Student{
        static time:string="20:00"
        static attendClass(){
            console.log("去上课")
        }
    }
    console.lg(Student.time)
    Student.attendClass()
```
#### 抽象类abstract
- 继承是多态使用的前提
  1. 所以在定义很多通用的调用接口时, 我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式。
  2. 但是，父类本身可能并不需要对某些方法进行具体的实现，所以父类中定义的方法,，我们可以定义为抽象方法。

- 什么是 抽象方法,在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法
    1. 必须方法在抽象类中
    2. 抽象类是使用abstract声明的类
- 抽象类有如下的特点
    1. 抽象类是不能被实例的话（也就是不能通过new创建）
    2. 抽象方法必须被子类实现,否则该类必须是一个抽象类
```javascript
// 抽象类
    abstract class Shape{
        // 抽象方法
        abstract getAea():number
    }
    // 1
    class Circle extends Shape{
        private r:number
        constructor(r:number){
            super()
            this.r=r
        }
         getAea(){
            return  this.r+this.r
         }
    }
    // 2
    class Circle2 extends Shape{
        private width:number
        private height:number

        constructor(width:number, height:number){
            super()
            this.width=width
            this.height=height
        }
        getAea(){
            return this.width*this.height
        }
    }
    const Circle=new Circle(10)
    const Circle2=new Circle2(100,200)

    console.log(Circle.getAea())//20
    console.log(Circle2.getAea())//20000

```
#### 类的类型
    类本身也是可以作为一种数据类型
``` javascript 
    class Person{
        name:sting
        constructor(name){
            this.name=name
        }
        running(){
            console.log(this.name+"running")
        }
    }
    const p1:Person=new Person("poro")
    const p2:Person={
        name:"poro",
        running:function(){
            console.log(this.name+"running")
        }
    }
    // 1
```
# 接口的声明
    通过type可以用来声明一个对象类型
```javascript
type Point={
    x:number
    y:number
}

```
    对象的另外一种声明方式就是通过接口来声明：
```javascript

interface Point{
    x:number
    y:number
}
```
### 可选属性
    接口中也可以定义可选属性
```javascript
    interface Person{
        name:string
        age:number
        friend?:{
            string:string
        }
    }
    const person:Person={
        name:"poro",
        age:18,
        friend:{
            name:"Theest"
        }
    }
```
### 只读属性
    也可以定义只读属性
    这样意味着再初始化之后，这个值是不可以被修改的
```javascript
interface Person{
    readonly name:string
    age?:number
    readonly friend:{
        name:string
    }
}
const person:Person={
    name:"poro",
    age:18,
    friend:{
        name:"TheBest"
    }
}
// person.name="xxx" 不可以设置
//  person.friend={} 不可以设置
person.friend.name="xxx"
```
### 索引类型
    使用interface来定义对象类型，这个时候其中的属性名、类型、方法都是确定的，但是有时候会遇到类似下面的对象：
```javascript
    interface FrontLanguage{
        [index:number]:string
    }
    const frontend:FrontLanguage={
        1:"HTML",
        2:"CSS"
        3:"javaScript"
    }
     interface FrontLanguage{
        [index:string]:number
        java:number
    }
    const frontend:FrontLanguage={
       "java":1995,
       "javascript":1996,
       "c":1972
    }

```
### 函数类型
    使用interface定义函数类型
```javascript
interface CalcFunc{
        (num1:number,num2:number):number
}
const add:CalcFunc=(num1,num2)=>{
    return num1+num2
}
const sub:CalcFunc=(num1,num2)=>{
    return num1-num2
}
```
### 接口继承
    1.接口和类一样是可以进行继承的，也是使用extends关键字
    2.接口是支持多继承的（类不支持多继承）
```javascript
interface Person{
    name:string
    eating:()=>void
}
interface Animal{
    running:()=>void
}
interface student extends Animal,Person{
    sno:number
}


// **********************

const stu:student={
    sno:180,
    name:"poro",
    eating:function(){

    },
    running:function(){

    }
}
```
### 接口的实现
    1. 接口定义后，也是可以被类实现的
    2. 如果被一个类实现，那么在之后需要传入接口的地方，都可以将这个类传入
    3. 这就是面向接口开发
```javascript
interface ISwim{
    swimming:()=>void
}
interface IRun{
    running:()=>void
}
class Person implements ISwim,IRun{
    swimming(){
        console.log("swimming")
    }
    running(){
        console.log("running")
    }
}


// ----------------------------
function swim(swimmer:ISwim){
    swimmer.swimming()
}
const p=new Person()
swim(p)

```
# 交叉类型
    交叉类型累死表示需要满足多个类型的条件 使用&符号
```javascript
interface Colorful{
    color:string
}
interface IRun{
    running:()=>void
}
type NewType=Colorful & IRun

const obj:NewType={
    color:"red",
    running:function(){

    }
    }
```
# interface和type区别
- interface和type都可以用来定义对象类型，
  - 如果是定义非对象类型，通常推荐使用type，比如Direction、Alignment、一些Function
- 如果是定义对象类型，那么他们是有区别的
  - interface 可以重复的对某个接口来定义属性和方法
  - 而type定义的是别名，别名是不能重复的
```javascript
    interface IPerson{
        name:string
        running:()=>void
    }
    interface IPerson{
        age:name
    }

//-------------------------
    type Person{
        name:string
        running:()=>void
    }
    // error 
    type Person{
       age:name
    }
```
# 字面量赋值
1.提示 这是因为TypeScript在字面量直接赋值的过程中，为了进行类型推导会进行严格的类型限制。
```javascript
    interface IPerson{
        name:string
        eating:()=>void
    }

const p:IPerson={
    name:"poro",
    age:18, //object中没有age
    eatings:()=>function(){

    }
}

```
2.如果我们是将一个 变量标识符 赋值给其他的变量时，会进行freshness擦除操作
```javascript
    interface IPerson{
        name:string
        eating:()=>void
    }

const obj={
    name:"poro",
    age:18, //error
    eatings:()=>function(){

    }
}
const p:IPerson=obj
```
# ts枚举类型 enum
- 枚举类型是为数不多的TypeScript特性有的特性之一
    - 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；
    - 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；
```javascript
enum Direction{
    LEET,
    TOP,
    RIGHT,
    BOTTOM
}

function turnDirection(direction: Direction){
    switch (direction){
        case LEET:
            console.log("向左")
        break;
        case RIGHT:
            console.log("向右")
        break;
        case TOP:
            console.log("向上")
        break;
        case BOTTOM:
            console.log("向下")
        break;
        default:
            const myDirection: never=direction
    }
}
```
### 枚举值的类型
```javascript
// 默认值是
    enum Direction{
        LEET=0,
        TOP=1,
        RIGHT=2,
        BOTTOM=3
    }
    // 可以设置其他值
    // 这个时候就是从100开始递增
    enum Direction{
        LEET=100,
        TOP,
        RIGHT,
        BOTTOM
    }    
    // 赋值其他的类型
      enum Direction{
        LEET="LEET",
        TOP="TOP",
        RIGHT,
        BOTTOM
    }
```
# 泛型
- 软件工程的主要目的是构建不仅仅明确和一致的API，还要让你的代码具有很强的可重用性
  - 我们可以通过函数来封装一些API，通过传入不同的函数参数，让函数帮助我们完成不同的操作
  - 对于参数的类型也可以参数化
- 可以使用两种方式来调用
  - 通过 <类型> 的方式将类型传递给函数；
  - 通过类型推到，自动推到出我们传入变量的类型
  - 在这里会推导出它们是 字面量类型的，因为字面量类型对于我们的函数也是适用的
```javascript
    foo<string>("abc")
    foo<number>(123)
```
 -也可以传入多个类型：
```javascript
    function foo<T,E>(a1:T,a2:E){

    }
```
- 平时在开发中可能会看到一些常用的名称：
  - T：Type的缩写，类型
  - K、V：key和value的缩写，键值对
  - E：Element的缩写，元素
  - O：Object的缩写，对象
# 泛型接口
    在定义接口的时候我们也可以使用泛    
```javascript
interface IFoo<T>{
    initialValue: T,
    valueList:T[],
    handleValue:(value:T)=>void
}

const foo:IFoo<number>={
    initialValue:0,
    valueList:[0,1,2,3],
    handleValue:(value:number)=>{
        console.log(value)
    }
}
```
# 泛型类
```javascript
    class Point<T>{
        x:T,
        y:T
        constructor(x:T, y:T){
            this.x = x;
            this.y = y;
        }
    }
    const p1=new Point(10,20)
    const p2=new Point<number>(10,20)
    const p3:Point<number>=new Point(10,20)

```
# 泛型约束
    1.有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中
    2. 比如string和array都是有length的，或者某些对象也是会有length属性的
    3. 那么只要是拥有length的属性都可以作为我们的参数类型？

```javascript
interface ILength{
    length:number
}
function getLength<T extends ILength>(arr:T){
    return arr.length
}
console.log(getLength("abc"))
console.log(getLength(["abc","def"]))
console.log(getLength({length:100,name:"poro"}))
```
# 模块化
- TypeScript支持两种方式来控制作用域
  - 模块化：每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS
  - 命名空间：通过namespace来声明一个命名空间
```javascript   
export function add(num1:number,num2:number){
    return num1+num2
}
function sub(num1:number,num2:number){
    return num1-num2
}
export default sub
```
# 命名空间namespace
命名空间主要目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题。
```javascript
    export namespace Time {
        export function format(time:string){
            return "2022-02-22"
        }
    }
    export namespace Price{
        export function format(price:number){
            return "123456"
        }
    }
```
# 类型的查找
- Typescript对类型的管理和查找规则
  - 内置类型声明
  - 外部定义类型声明
  - 自己定义类型声明
### 内置类型声明
1. 内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件
2. 包括比如Math、Date等内置类型，也包括DOM API，比如Window、Document等
3. 内置类型声明通常在我们安装typescript的环境中会带有的；
https://github.com/microsoft/TypeScript/blob/release-2.4/lib
### 外部定义类型声明
1. 外部类型声明通常是使用一些库（比如第三方库）时，需要的一些类型声明
2. 这些库通常有两种类型声明方式
   1. 在自己库中进行类型声明（编写.d.ts文件），比如axios
   2. 通过社区的一个公有库DefinitelyTyped存放类型声明文件
      1. 该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/
      2. 库查找声明安装方式的地址 https://www.typescriptlang.org/zh/
      3. 如安装react的类型声明： npm i @types/react --save-dev
### 自定义声明
1. 使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash
2. 给自己的代码中声明一些类型，方便在其他地方直接进行使用；
### 声明变量-函数-类
```javascript
let name="poro"
let age=10
let height=1.88
function foo(){
    console.log("foo")
}
function Person(name,age){
    this.name=name
    this.age=age
}
```

```javascript
declare let name:string
declare let age:number
declare let height:number
declare function foo:()=>void
declare class Person{
    name:string
    age:number
    constructor(name:string,age:number)
}

```
# 声明模块
     也可以使用声明模块 比如lodash 模块默认不能使用的情况,自己来声明这个模块

```javascript
declare module "lodash" {
    export function join(args:any[]):any
}
```
1. 声明模块的语法: declare module '模块名' {}。
2. 在声明模块的内部，我们可以通过 export 导出对应库的类、函数等；
# declare文件
    在某些情况下，也可以声明文件
    1. 比如在开发vue的过程中，默认是不识别我们的.vue文件的，那么我们就需要对其进行文件的声明；
    2. 比如在开发中我们使用了 jpg 这类图片文件，默认typescript也是不支持的，也需要对其进行声明；
```javascript
    declare module "*.vue"{
        import {DefineComponent} from "vue"
        const component:DefineComponent
        export default component
    } 
    declare module "*.jgp"{
        const src:string
        export default src
    }
```
# declare命名空间
1. 比如我们在index.html中直接引入jq
   1. CDN地址： https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js
2. 可以进行命名空间声明
```javascript
declare namespace $ {
    function ajax(setting:any):void
}
```
3. 在main.ts中就可以使用了
```javascript
$.ajax({
    url:"xxxxx"
    success:(res:any)=>{
        console.log(res)
    }
})
```

# tsconfig.json 文件
1. tsconfig.json是用于配置TypeScript编译时的配置选项：
2. https://www.tslang.cn/docs/handbook/tsconfig-json.html
```javascript
{
  "compilerOptions": {
    // 目标代码(ts -> js(es5/6/7))
    "target": "esnext",
    // 目标代码需要使用的模块化方案(commonjs require/module.exports/es module import/export)
    "module": "esnext",
    // 严格一些严格的检查(any)
    "strict": true,
    // 对jsx进行怎么样的处理
    "jsx": "preserve",
    // 辅助的导入功能
    "importHelpers": true,
    // 按照node的方式去解析模块 import "/index.node"
    "moduleResolution": "node",
    // 跳过一些库的类型检测 (axios -> 类型/ lodash -> @types/lodash / 其他的第三方)
    // import { Person } from 'axios'
    "skipLibCheck": true,
    // export default/module.exports = {}
    // es module 和 commonjs
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    // 要不要生成映射文件(ts -> js)
    "sourceMap": true,
    // 文件路径在解析时, 基本url
    "baseUrl": ".",
    // 指定具体要解析使用的类型
    "types": ["webpack-env"],
    // 路径解析(类似于webpack alias)
    "paths": {
      "@/*": ["src/*"],
      "components/*": ["src/components/*"]
    },
    // 可以指定在项目中可以使用哪里库的类型(Proxy/Window/Document)
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": ["node_modules"]
}

```