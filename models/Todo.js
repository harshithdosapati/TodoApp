const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Database Schema to Store Todos
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
  },
  user_name: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'user'
  },
  account_id: {
    type: Schema.Types.ObjectId, ref: 'accounts'
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);