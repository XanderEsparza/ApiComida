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
    const {key, attribute} = req.params
    const search = {}
    search[key] = attribute
    try {
        const comidas = await Comida.find(search)
        if(comidas.length === 0){
            res.status(404).send("No hay comidas para mostrar")
            console.log(search)
        }else{
            res.send(comidas)
            console.log(search)
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