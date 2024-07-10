
const User = require('../models/user.model');
const transporter = require('../helpers/transporter')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const createUser = async (req, res) => {
  try {
    const { usuario, email, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ usuario, email, password:newPassword });
    await newUser.save();
    
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    const mailOptions = {
      from: 'xandervesper342@gmail.com',
      to: '2136000805@utna.edu.mx',
      subject: 'Nuevo usuario registrado',
      html: `
            <p>Un usuario se ha registrado:</p>
            <p>Username: ${usuario}</p>
            <p>Email: ${email}</p>
            <p>Token: ${token}</p>
        `,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al mandar el correo de confirmación', error);
        return res.status(500).send('Error al mandar correo de confirmación.');
      } else {
        console.log('Correo enviado:', info.response);
        res.status(200).send('Registro exitoso. Espere la confirmación del administrador');
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
    console.log(error)
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Usuario.findById(id)
    
    if(admin.rol === 'admin'){
      return res.status(400).send('No puedes borrar el perfil de administrador')
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};

const confirmUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.userId, { status: 'activo' });
    res.send('Usuario aceptado');
  } catch (error) {
      console.log('error', error)
    res.status(400).send('Token invalido');
  }
};

const denyUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndDelete(decoded.userId);
    res.send('Usuario rechazado');
  } catch (error) {
    res.status(400).send('Token invalido');
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  confirmUser,
  denyUser
};
