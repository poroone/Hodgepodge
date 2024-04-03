const { Sequelize } = require("sequelize")
const sequelize = new Sequelize('poroone', "root", "poroone2233!", {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("成功")
}).catch(err => {
    console.log("失败".err)
})