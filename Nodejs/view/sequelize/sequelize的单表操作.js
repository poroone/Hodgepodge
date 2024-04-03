const { Sequelize, DataTypes, Model ,Op} = require("sequelize")
console.log("1")
const sequelize = new Sequelize('poroone', "root", "poroone2233!", {
    host: 'localhost',
    dialect: 'mysql'
})

class Product extends Model {};
console.log("1")
Product.init({
    id: {
        type: DataTypes.INTEGER,
        PrimaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: DataTypes.DOUBLE,
    score: DataTypes.DOUBLE
}, {
    tableName: "products",
    createdAt:false,
    updatedAt: false,
    sequelize
})

async function queryProducts() {
    // 查询数据库中Products表中的所有内容
    const result = await Product.findAll({
        where :{
            price:{
                [Op.gte]:5000
            }
        }
    })
    console.log(result)
}

queryProducts()