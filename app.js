const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 4000;
const comidaRoute = require('./routes/comida.routes');
const userRoute = require('./routes/user.routes');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', comidaRoute);
app.use('/api', userRoute);

const mongoURI = 'mongodb://127.0.0.1:27017/comidas';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar', err));

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});
