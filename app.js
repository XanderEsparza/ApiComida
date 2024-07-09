const express = require('express');
const morgan = require("morgan")
const app = express();
const port = 4000;
const comidaRoute = require('./routes/comida.routes')
const loginRoute = require('./routes/loginRoutes')
const mongoose = require("mongoose"); 
require("dotenv").config();


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', comidaRoute, loginRoute)

//Conexion a mongo atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(()=> console.log("Conexion a MongoDB Atlas"))
  .catch((error)=> console.error(error));

app.use((req, res) => {
    res.status(404).json({
        message:"Ruta no encontrada"
    })
})

app.listen(port, ()=>{
    console.log(`aplicacion corriendo en el puerto ${port}`)
})