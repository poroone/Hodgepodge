// 普通函数
function num() {
    this.num1 = "123"

    console.log(num1)
}
num()
const a = new num()
console.log(num.prototype)
console.log(num.__proto__)
console.log(a.__proto__)
console.log(a.prototype)// undefined 构造函数没有prototype是__proto__
console.log(a.__proto__ === num.prototype) //true

console.log(num.prototype.__proto__ === Object.prototype)//true




// 箭头函数
const num2 = () => {
    this.num1 = "456"
    console.log(num1)
}
num2()

console.log(num2.prototype)//undefined 箭头函数没有原型

