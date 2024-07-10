const validateToken = require('../helpers/validateToken')
const userModel = require('../models/user.model');

const checkRoleAuth = (roles) => async (req, res, next) =>{
    try{
        
        const token = req.cookies.token;
        const tokenData = await validateToken(token)
        const userData = await userModel.findById(tokenData.userId)
        
        if([].concat(roles).includes(userData.rol)){
            next()
        }
        else{
            res.status(409)
            res.send({error: 'No tienes acceso. Solo administrador autorizado'})
        }
        
        
    }
    catch(e)
    {
        console.log(e)
        res.status(409)
        res.send({error: 'No entro al try'})
    }
}

module.exports = checkRoleAuth;
