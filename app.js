const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const comidaRoutes = require('./routes/comida.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();
const port = 4000;
const mongoURI = 'mongodb://127.0.0.1:27017/comidas';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Conexión a MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Conectado a MongoDB");
}).catch(err => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); 
});

// 
app.use('/api/comida', comidaRoutes);

// 
app.use('/api/usuarios', usuariosRoutes);

// 
app.use((req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada"
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Aplicación corriendo en el puerto ${port}`);
});
