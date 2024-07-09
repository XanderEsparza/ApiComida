const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser } = require('../controllers/user.controller');

router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);

module.exports = router;
