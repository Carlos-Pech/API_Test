const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

// module.exports = function(req,res,next){
//     if(req.path != '/auth/login'){
//         if(req.headers.authorization){
//             let token = req.headers.authorization.split(' ')[1];
//             jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
//                 if(error) return res.status(403).send({message: 'You do not have enough permissions to be here...',error});
//                 if(req.method != 'GET'){
//                     if(decoded.role == 'admin') next();
//                     else res.status(403).send({message: 'You do not have enough permissions to be here...'});
//                 }else{
//                     next();
//                 }
//             });
//         }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
//     }else next();
// }
module.exports=function(req,res,next){
    if(req.path != '/auth/login')
    {
        if(req.headers.authorization)
        {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message:'no tienes los permisos', error})
                if(req.method !='GET')
                {
                    if(decoded.role=='admin') next()
                    else res.status(403).send({message:'no tienes los permisos', error})
                }
                else{
                    next();
                }
            })
        } else  res.status(403).send({message:'no tienes permisos para estar aqui'})
    }else next();
}