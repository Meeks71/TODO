const express = require('express')
require('dotenv').config()//init dotenv

const mongoConfig = require('./config/mongoConfig')
const todosRouter = require('./routes/todosRouter')
const usersRouter= require('./routes/usersRouter')
const morgan = require('morgan')
const helmet = require('helmet')
const authRouter = require('./routes/authRouter')


const app = express()
const PORT = 5000

//Middleware 
app.use(express.json())
app.use(morgan('dev'))//Monitoring app
app.use(helmet())//Protecting the data to keep secure.
app.use('/auth', authRouter)

//* Routers
app.use('/todos', todosRouter)
app.use('/users', usersRouter)

//Route name for app
app.get('/', (req, res) => {
res.status(200).json("Welcome to my API!")
});


//App listener 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig();
});