const express = require('express');
const app = express();
const port = 4000;

app.get("/", (req,res)=>{
    res.json({
        message: "Aplicacion funcionando correctamente"
    })
})

app.listen(port, ()=>{
    console.log(`aplicacion corriendo en el puerto ${port}`)
})