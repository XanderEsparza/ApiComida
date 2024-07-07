// controllers/usuarios.controller.js

const Usuario = require('../models/usuario.model');

// Controlador para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, edad } = req.body;

        // Validar datos
        if (!nombre || !correo || !edad) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        let usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            edad
        });

        // Guardar en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear usuario', error });
    }
};

// Controlador para eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        let usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Eliminar usuario
        await Usuario.findByIdAndDelete(id);

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
    }
};
