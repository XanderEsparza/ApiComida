const express = require('express');
const Router = express.Router();
const usuarioController = require("../controllers/loginControllers.js")

Router.post('/registro', usuarioController.registro);
Router.post('/login', usuarioController.Login)

module.exports = Router;