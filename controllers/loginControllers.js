const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const Login = async (req, res) => {
    const { usuario, password } = req.body;

    try {
        let username = await User.findOne({ usuario});
        if (!username) {
            return res.status(400).send('Usuario no existente');
        }

        const isMatch = await bcrypt.compare(password, username.password);
        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta');
        }

        if(username.status === 'pendiente'){
            return res.status(400).send('Acceso denegado. Usuario a la espera de confirmación del administrador')
        }

        const token = jwt.sign({ userId: username._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        console.log('token', token)
        res.status(200).send('Inicio de sesión exitoso');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.send('Sesion finalizada')
};

module.exports={Login, logout}
