const express = require('express');
const Router = express.Router();
const comidaController = require("../controllers/comidaController");

// Ruta para obtener todos los productos de comida
Router.get("/comida", (req, res) => {
    return res.json({
        message: "Si sirve"
    });
});

// Ruta para crear un nuevo producto de comida
Router.post("/comida", comidaController.createComida);

module.exports = Router;
