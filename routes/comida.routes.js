const express = require('express');
const Router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const checkStatusAuth = require('../middlewares/statusAuth')
const checkRoleAuth = require("../middlewares/rolAuth")

const comidaController = require("../controllers/comidaController")

Router.get("/comida", (req, res) => {
    return res.json({
        message:"Si sirve"
    }
)
})
Router.get("/comida/show", verifyToken, checkStatusAuth(['activo']), comidaController.show)
Router.get("/comida/find/:key/:attribute", verifyToken, checkStatusAuth(['activo']), comidaController.find)
Router.delete("/comida/eliminar/nombre/:nombre", verifyToken, checkRoleAuth(['admin']), comidaController.eliminarComidaPorNombre)
Router.post("/comida/crear", verifyToken, checkRoleAuth(['admin']), comidaController.createComida);
Router.put("/comida/actualizar/:id", verifyToken, checkRoleAuth(['admin']), comidaController.actualizarComida);


module.exports = Router;
