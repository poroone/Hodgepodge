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
# 类的继承
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
# 类的成员修饰符
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
# 只读属性 readonly
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
# getters/setters
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