const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).send('Ruta bloqueada. Inicia sesión');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send('Token no válido. Inicia sesión');
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken

