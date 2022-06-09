const express = require('express')
require('dotenv').config()

const mongoConfig = require('./config/mongoConfig')
const todosRouter = require('./routes/contactRouter')
const usersRouter= require('./routes/userRouter')

const app = express()
const PORT = 5000

app.use(express.json())

//* Routers
app.use('/todos', todosRouter)
app.use('/', usersRouter)

app.get('/', (req, res) => {
res.status(200).json("Welcome to my API!")
})


//App listener 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig()
})