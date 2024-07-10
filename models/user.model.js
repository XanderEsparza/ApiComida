// models/user.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  usuario: {
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

const User = mongoose.model('User', UserSchema);

User.init().then(() => {
  console.log('Indexes ensured');
}).catch(err => {
  console.error('Index creation error:', err);
});

module.exports = User;
