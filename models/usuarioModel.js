// models/usuario.model.js

const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    edad: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
