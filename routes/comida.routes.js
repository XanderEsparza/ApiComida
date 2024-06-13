const express = require('express');
const Router = express.Router();

Router.get("/comida", (req,res) =>{
    return res.json({
        message:"Si sirve"
    })
})

module.exports = Router;