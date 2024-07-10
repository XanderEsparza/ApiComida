const express = require('express');
const Router = express.Router();
const loginController = require("../controllers/loginControllers.js")

Router.post('/login', loginController.Login)
Router.get('/logout', loginController.logout)

module.exports = Router;