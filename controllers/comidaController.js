const Comida = require('../models/comidaModel');

const eliminarComidaPorNombre = async (req, res) => {
  try {
    const nombreComida = req.params.nombre;
    const comidaEliminada = await Comida.findOneAndDelete({ nombre: nombreComida });

    if (!comidaEliminada) {
      return res.status(404).json({ mensaje: 'Comida no encontrada' });
    }

    res.status(200).json({ mensaje: 'Comida eliminada exitosamente', comida: comidaEliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error eliminando la comida', error });
  }
};
  
module.exports={ eliminarComidaPorNombre}