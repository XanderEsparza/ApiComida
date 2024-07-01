const Comida = require('../models/comidaModel');

const show = async(req, res) =>{
    try{
        const comidas = await Comida.find();
        res.send(comidas);
    }catch (error) {
        res.status(400).send(error);
    }
}

const find = async(req, res) => {
    try {
        const comidas = await Comida.find({ nombre: req.params.nombre })
        if(comidas.length === 0){
            res.status(404).send("No hay comidas con ese nombre")
        }else{
            res.send(comidas)
        }
        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

module.exports = {
    show,
    find
}