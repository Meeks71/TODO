const express = require('express')
const UserModel = require('../models/usersSchema')
// pulls out the two function we need from express validator
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// * Create a Router
const router = express.Router()

//* GET USERS
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
 });







//* Create or Register a new User
router.post('/', [
    check('username', "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password", "Please enter a password with six of more characters").isLength({min: 6}),
    check("password", "Enter a password").notEmpty()]
    ,async (req, res) => {

    const userData = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json(errors.array())
    }



    try {
         const userExist = await UserModel.findOne({email: userData.email})
         //if user exists, return already exisrs
         if(userExist) {
         return  res.json({msg: "User already exists!"})
         }

        //Create new user
        //Create the Salt 
        const SALT = await bcrypt.genSalt(10)
        //Use the salt to create the HASH
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        userData.password = hashedPassword
        //Write the user to the db
        const user = await UserModel.create(userData)
        res.status(201).json(user)

        //create a new JWT Token
        const payload = {
            id: user_id
        }
        const SECRET_KEY = 'MY_SECRET_KEY'
        const TOKEN =jwt.sign(payload, SECRET_KEY)
        
        res.status(201).json({
            user: user,
            token: TOKEN 
        })


    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!!!')
    }
})

 //* UPDATE TODO BY ID
 router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newUserData = req.body
     try {
         //* find the todo by the id
         const user = await UserModel.findByIdAndUpdate(id, newUserData, {new: true})
         res.status(202).json(user)
     } catch (error) {
         console.log(error)
     }
});

//! DELETE A TODO
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'The contact was deleted!'})
    } catch (error) {
        console.log(error);
    }
})



module.exports = router

