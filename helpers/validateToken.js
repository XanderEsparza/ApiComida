const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateToken = async (token) =>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (e)
    {
        return null
    }
}

module.exports = validateToken;