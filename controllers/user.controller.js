const User = require('../models/user.model');

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
    updateUser
};
