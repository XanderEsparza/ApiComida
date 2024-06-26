const express = require('express');
const Router = express.Router();
const comidaController = require("../controllers/comidaController")

Router.get("/comida", (req,res) =>{
    return res.json({
        message:"Si sirve"
    })
})

Router.get("/comida/show", comidaController.show)

module.exports = Router;