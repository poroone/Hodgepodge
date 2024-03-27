const express = require('express');

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
    res.json(["poro"])
})

userRouter.post("/:id", (req, res, next) => {
    res.json(`${req.params.id}用户的信息`)
})

userRouter.post("/", (req, res, next) => {
    res.json("create user")
})

module.exports = userRouter