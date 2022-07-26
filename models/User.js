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
  default_account: {
    id:{
      type: Schema.ObjectId, ref: 'accounts'
    },
    name: {
      type: String
    }
  },
  accounts: [{
    id: {
      type: Schema.Types.ObjectId, ref: 'accounts'
    },
    name: {
      type: String
    },
    accepted: {
      type: Boolean
    }
  }],
  register_date: {
    type: Date,
    default : Date.now
  } 
});

module.exports = User = mongoose.model('user', UserSchema);