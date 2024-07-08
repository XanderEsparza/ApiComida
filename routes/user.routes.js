const express = require('express');
const router = express.Router();
const { createUser, deleteUser } = require('../controllers/user.controller');

// Crear un nuevo usuario
router.post('/users', createUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

module.exports = router;
