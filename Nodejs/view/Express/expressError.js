const express = require("express")

const multer = require("multer")

const upload = multer()
const app = express()

const USERNAME_DOES_NOT_EXIST = "username does not exist"
const USERNAME_ALREADY_EXIST = "username already exist"
app.post("/login", upload.any(), (req, res, next) => {
    if (req.body.username) {
        res.json("user login success")
    } else {
        next(new Error(USERNAME_DOES_NOT_EXIST));
    }
})

app.post("/register", upload.any(), (req, res, next) => {
    if (!req.body.username) {
        res.json("user login success")
    } else {
        next(new Error(USERNAME_ALREADY_EXIST));
    }
})
// 错误中间件 4个参数用来处理错误的next
app.use((err, req, res, next) => {
    let status = 400;
    let message = ""
    console.log("error")
    switch (err.message) {
        case USERNAME_DOES_NOT_EXIST:
            message = "username does not exist"
            break
        case USERNAME_ALREADY_EXIST: 
            message = "username already exist"
            break
        default:
            message = "NOT FOUND"
    }
    res.status(status)
    res.json({
        "errorCode":status,
        "errorMessage":message}) 
})

app.listen(8888, () => {
    console.log("server 8888 http://localhost:8888")
})