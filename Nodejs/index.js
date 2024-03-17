// console.log(process)

// console.log(__dirname)

// console.log(__filename)
// console.log(global)

// var name="poro"
// console.log(window.name) // poro


var name="poroone"
// console.log(global.name) //undefined
exports.name="poro"
module.exports={name}
console.log(module)
console.log(exports)

const buffer=new Buffer("why")
console.log(buffer)