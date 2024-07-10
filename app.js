const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const comidaRoute = require('./routes/comida.routes')
const loginRoute = require('./routes/loginRoutes')
const userRoute = require('./routes/user.routes');
const mongoose = require("mongoose"); 
require("dotenv").config();

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/sesion', loginRoute)

app.use('/api', comidaRoute)
app.use('/api/user', userRoute);


mongoose.connect(process.env.MONGODB_URI)
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
