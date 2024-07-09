const bcrypt = require('bcryptjs');
const Usuario = require('../models/loginModel');


const registro = async (req, res)=>{
    try{
        const {correo, pass} = req.body;
        let usuario = await Usuario.findOne({correo});
        if(usuario){
            return res.status(400).json({mensaje: 'Usuario existente'});
        }
        usuario = new Usuario({
            correo,
            pass
        });
        const salt = await bcrypt.genSalt(10);
        usuario.pass = await bcrypt.hash(pass, salt);

        await usuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado' });
    }
    catch (err)
    {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
}

const Login = async (req, res) => {
    const { correo, pass } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).send('Correo no existente');
        }

        const isMatch = await bcrypt.compare(pass, usuario.pass);
        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta');
        }
        res.status(200).send('Inicio de sesión exitoso');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};


module.exports={registro, Login}
