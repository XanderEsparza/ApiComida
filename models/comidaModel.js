const mongoose = require('mongoose');

const comidaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  existencia: {
    type: Number,
    required: true
  }
});

const Comida = mongoose.model('Comida', comidaSchema);

module.exports = Comida;