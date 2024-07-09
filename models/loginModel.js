const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    correo:{
        type:String,
        require:true,
        unique:true,
    },
    pass:{
        type:String,
        require:true
    }
});

const Usuario = mongoose.model('User', userSchema);

module.exports = Usuario;