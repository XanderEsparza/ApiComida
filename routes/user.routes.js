const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const checkStatusAuth = require('../middlewares/statusAuth')
const checkRoleAuth = require("../middlewares/rolAuth")
const { createUser, deleteUser, getAllUsers, updateUser, confirmUser, denyUser } = require('../controllers/user.controller');

// Crear un nuevo usuario
router.post('/users', createUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

router.get('/users', verifyToken, checkRoleAuth(['admin']), getAllUsers);
router.put('/actualizar/:id', verifyToken, checkRoleAuth(['admin']), updateUser);
router.post('/crear',  createUser);
router.delete('/eliminar/:id', verifyToken, checkRoleAuth(['admin']), deleteUser);
router.put('/store/confirm/:token', verifyToken, checkRoleAuth(['admin']), confirmUser)
router.delete('/store/deny/:token', verifyToken, checkRoleAuth(['admin']), denyUser)

module.exports = router;
