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

mongoose.connect('mongodb://localhost:27017/comida', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res) => {
    res.status(404).json({
        message:"Ruta no encontrada"
    })
})

app.listen(port, ()=>{
    console.log(`aplicacion corriendo en el puerto ${port}`)
})