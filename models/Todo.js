const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  url: {
    type: String
  },
  order: {
    type: Number
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);