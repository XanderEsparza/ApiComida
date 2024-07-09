const express = require('express');
const router = express.Router();
const { createUser, deleteUser, getAllUsers, updateUser } = require('../controllers/user.controller');

// Crear un nuevo usuario
router.post('/users', createUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);

module.exports = router;
