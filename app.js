const express = require('express');
const morgan = require("morgan")
const app = express();
const port = 4000;
const comidaRoute = require('./routes/comida.routes')
const mongoose = require("mongoose"); 

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', comidaRoute)

const mongoURI = 'mongodb://127.0.0.1:27017/nombre_base_datos';

// Conectar a MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use((req, res) => {
    res.status(404).json({
        message:"Ruta no encontrada"
    })
})

app.listen(port, ()=>{
    console.log(`aplicacion corriendo en el puerto ${port}`)
})