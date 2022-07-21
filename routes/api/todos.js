const { application } = require('express');
const express = require('express');
const router = express.Router();


const Todo = require('../../models/Todo');

// @route  GET api/todos
// @desc   Get all Todos
router.get('/', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos));
});

// @route  GET api/todos/:id
// @desc   Get a Todo
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo));
});

// @route  POST api/todos
// @desc   Create a Todo
router.post('/', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: false,
    url: '',
    order: req.body.order
  });

  newTodo.save().then(todo => { 
    todo.url = `http://localhost:2000/api/todos/${todo._id}`;
    todo.save();
    return res.json(todo)});
});

// @route  DELETE api/todos/:id
// @desc   Delete a Todo
router.delete('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success:false}));
}); 

// @route  DELETE api/todos
// @desc   Delete all Todos
router.delete('/', (req, res) => {
  Todo.deleteMany()
    .then(() => res.json({success: true}));
});

// @route  PATCH api/todos/:id
// @desc   Patch a Todo
router.patch('/:id', (req, res) => {
  const body = req.body;
  Todo.findById(req.params.id)
  .then(todo => {
    if(body.title != undefined) todo.title = body.title;
    if(body.completed != undefined) todo.completed = body.completed;
    if(body.order != undefined) todo.order = body.order;
    todo.save();
    return res.json(todo)
  })
  .catch(err => res.status(404).json({Error: "Todo Not Found"}));
});

module.exports = router;