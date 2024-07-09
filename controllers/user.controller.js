
const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
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

module.exports = {
    getAllUsers,
    updateUser,
    createUser,
    deleteUser
};
