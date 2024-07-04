const Comida = require('../models/comidaModel');


// comidaController.js
const Comida = require('../models/comidaModel');

const actualizarComida = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, existencia } = req.body;

    try {
        const comidaActualizada = await Comida.findByIdAndUpdate(
            id,
            { nombre, precio, descripcion, existencia },
            { new: true, runValidators: true }
        );

        if (!comidaActualizada) {
            return res.status(404).json({ message: 'Comida no encontrada' });
        }

        res.json(comidaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando la comida', error });
    }
};

module.exports = {
    actualizarComida,
   
};
