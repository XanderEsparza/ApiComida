const Comida = require('../models/comidaModel');

// Crear nuevo producto de comida
const createComida = async (req, res) => {
    const { nombre, precio, descripcion, existencia } = req.body;
    try {
        const newComida = new Comida({ nombre, precio, descripcion, existencia });
        await newComida.save();
        res.status(201).json(newComida);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto de comida", error });
    }
};

module.exports = {
    createComida
};
