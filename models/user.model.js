// models/user.model.js
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: [true, 'El usuario es obligatorio'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: props => `${props.value}. Ingresa un usuarios válido(no se aceptan caracteres especiales)`
    }
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v); // Utiliza el paquete validator para verificar el formato de email
      },
      message: props => `${props.value}. Ingresa un correo electrónico válido.`
    }
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
