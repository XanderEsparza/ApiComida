const Comida = require('../models/comidaModel');

const show = async(req, res) =>{
    try{
        const comidas = await Comida.find();
        res.send(comidas);
    }catch (error) {
        res.status(400).send(error);
    }
}



module.exports = {
    show
}