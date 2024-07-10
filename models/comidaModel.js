const mongoose = require('mongoose');
const validator = require('validator');

const comidaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s]+$/.test(v);
      },
      message: props => `${props.value} no es un nombre válido(no se permiten caracteres especiales)`
    }
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: props => `El precio debe ser un número positivo.`
    }
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s]+$/.test(v);
      },
      message: props => `${props.value} no es una descripción válida. Solo se permiten caracteres alfanuméricos y espacios.`
    }
  },
  existencia: {
    type: Number,
    required: [true, 'La existencia es obligatoria'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v) && v >= 0;
      },
      message: props => `La existencia debe ser un número entero positivo.`
    }
  }
});

const Comida = mongoose.model('Comida', comidaSchema);

module.exports = Comida;