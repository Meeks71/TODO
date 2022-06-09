const express = require('express')
const TodoModel = require('../models/todoSchema')

// * Create a Router
const router = express.Router()

//* GET TODOS
router.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.find()
        res.status(200).json(todos)
    } catch (error) {
        console.log(error)
    }
 });


//Create todos
router.post('/', async (req, res) => {
         const todoData = req.body// gets the data from the request 
         try {
             const todo = await TodoModel.create(todoData)
             res.status(201).json(todo)
         } catch (error) {
             console.error(error)
             res.status(400).json('Bad request!')
        }
});

//Get todos by ID 
router.get('/:id', async(req , res) => {
const id = req.params.id

try {
    const todo = await TodoModel.findById(id)
    res.status(200).json(todo)
} catch (error) {
    console.error(error)
    res.status(400).json({
        msg: 'Id not found'
    });
  }
});

//Update tODO by ID
//* UPDATE TODO BY ID
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newToDoData = req.body
     try {
         //* find the todo by the id
         const todo = await TodoModel.findByIdAndUpdate(id, newToDoData, {new: true})
         res.status(202).json(todo)
     } catch (error) {
         console.log(error)
     }
});

//! DELETE A TODO
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const todo = await toDoModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'The contact was deleted!'})
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;