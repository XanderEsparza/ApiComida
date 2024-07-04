const express = require('express');
const Router = express.Router();

const comidaController = require("../controllers/comidaController")

Router.get("/comida", (req,res) =>{
    return res.json({
        message:"Si sirve"
    })
})

module.exports = Router;