<template>
    <div>

    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const obj = reactive({
    name: "poro",
    age: 18
})
console.log("age" in obj)
// class类
class Person {
    name!: string
    age: number
    constructor(name: string, age: number) {
        this.age = age
        this.name = name
    }
    running() {
        console.log(this.name + "running")
    }
    eating() {
        console.log(this.name + "eating")
    }
}

console.log(new Person("poro", 12))
// 继承
class Student extends Person {
    sno: number

    constructor(name: string, age: number, sno: number) {
        super(name, age)
        this.sno = sno
    }
    studying() {
        console.log(this.name + "studying")
    }
}
console.log(new Student("poro", 12, 12))
// 修饰符
class person {
    private name: string

    constructor(name: string) {
        this.name
    }
}
console.log(new person("12"))
class persons {
    protected name: string

    constructor(name: string) {
        this.name = name
    }
}
console.log(new persons("poro222"))
// 属性“name”受保护，只能在类“persons”及其子类中访问
// console.log(new persons("poro233").name)
class aPerson {
    private name: string
    constructor(name: string) {
        this.name = name
    }
}
// 属性“name”为私有属性，只能在类“aPerson”中访问
// console.log(new aPerson("poro333").name)

class student extends aPerson {
    constructor(name: string) {
        super(name)
    }
    running(){
        // 属性“name”为私有属性，只能在类“aPerson”中访问
        // console.log(this.name+"running")
    }
}
// console.log(new student("poro333").name)s
// readonly 私有属性
class Personv{
        readonly name:string
        constructor(name:string){
            this.name=name
        }
    }
    const p=new Personv("poro")
  console.log(  p.name)
//  p.name="123" 
// get set 
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
    const pg=new Persong("poro")
    console.log(pg.name)
    pg.name="poroone"
    console.log(pg.name)


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
    const Circle3=new Circle(10)
    const Circle4=new Circle2(100,200)

    console.log(Circle3.getAea())
    console.log(Circle4.getAea())

    // enum Direction{
    //     LEET=0,
    //     TOP=1,
    //     RIGHT=2,
    //     BOTTOM=3
    // }
    // 可以设置其他值
    // 这个时候就是从100开始递增
    // enum Direction{
    //     LEET=100,
    //     TOP,
    //     RIGHT,
    //     BOTTOM
    // }    
    // // 赋值其他的类型
      enum Direction{
        LEET,
        TOP,
        RIGHT="RIGHT",
        BOTTOM="BOTTOM"
    }
console.log(Direction)
</script>
<style scoped></style>