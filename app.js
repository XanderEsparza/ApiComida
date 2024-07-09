const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const comidaRoute = require('./routes/comida.routes')
const loginRoute = require('./routes/loginRoutes')
const userRoute = require('./routes/user.routes');
const mongoose = require("mongoose"); 
require("dotenv").config();

require('dotenv').config()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', comidaRoute, loginRoute)

//Conexion a mongo atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(()=> console.log("Conexion a MongoDB Atlas"))
  .catch((error)=> console.error(error));
app.use('/api', comidaRoute)
app.use('/api', userRoute);


mongoose.connect(process.env.mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});
