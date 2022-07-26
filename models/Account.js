const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Database Schema to Store Todos
const AccountSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});


module.exports = Account = mongoose.model('accounts', AccountSchema);