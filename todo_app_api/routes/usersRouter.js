const express = require('express')
const UserModel = require('../models/usersSchema')

//Create a router 
const router = express.Router()

router.post('/', async(req, res, ) => {
    const userData = req.body

    try {
        const user =await UserModel.create(userData)
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
           res.status(400).json('bad request!!!')
    }
})

module.exports = router 