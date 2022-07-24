const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Database Schema to store Userdetails
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default : Date.now
  } 
});

module.exports = Todo = mongoose.model('user', UserSchema);