const userModel = require('../models/user.model');
const validateToken = require('../helpers/validateToken')

const checkStatusAuth = (statuses) => async (req, res, next) =>{
    try{
        
        const token = req.cookies.token;
        console.log('token', token)
        const tokenData = await validateToken(token)
        const userData = await userModel.findById(tokenData.userId)
        
        if([].concat(statuses).includes(userData.status)){
            next()
        }
        else{
            res.status(409)
            res.send({error: 'No tienes acceso. Esperando confirmación del administrador'})
        }
        
        
    }
    catch(e)
    {
        console.log(e)
        res.status(409)
        res.send({error: 'No entro al try'})
    }
}

module.exports = checkStatusAuth;
