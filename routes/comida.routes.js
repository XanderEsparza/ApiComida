const express = require('express');
const Router = express.Router();
const comidaController = require("../controllers/comidaController");

Router.get("/comida", (req, res) => {
    return res.json({
        message: "Si sirve"
    });
});

Router.post("/comida", comidaController.createComida);

module.exports = Router;
