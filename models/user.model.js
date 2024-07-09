// models/user.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
  rol:{
    type: String,
    default: 'user',
  },
  status:{
    type: String,
    default: 'pendiente'
  }
});

module.exports = mongoose.model('User', UserSchema);
