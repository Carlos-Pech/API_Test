const User = require('../models/User');
const express = require('express');
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config');

//Username
//Password

// const login=(req,res)=>{
//     let username = req.body.username;
//     let password = req.body.password;

    
//     User.findOne({username})
//     .then(user=>{
//         if(!user)return res.status(404).send({message:'user does not exist '})
//         bcrypt.compare(password, user.password)
//         .then(match=>{
//             // if(match)return res.status(200).send({message:'ACCES'})
//             // return res.status(200).send({message:'INORRECT PASSWORD'})
//             if(match)
//             {
//                 payload={
//                     username:use.username,
//                     email:user.email,
//                     name:user.name
//                 }
//                 jwt.sign(payload,CONFIG.SECRET_TOKEN,function(error,token){
//                     if(error){
//                         res.status(500).send({error})
//                     }
//                     else
//                     {
//                         console.log('iniciado')
//                         res.status(200).send({message:'Acces', token})
//                     }
//                 })
//             }
//             else{

//             }
//         })
//     }).catch(error=>console.log(error))
//     res.status(500).send({error})
// }

// module.exports ={login};
const login = (req, res) => {
  const { username, password } = req.body; // Desestructuramos username y password desde el cuerpo de la petición
  
  User.findOne({ username })
    .then(user => {
      if (!user) { // Si no se encuentra un usuario, se devuelve un error 404
        return res.status(404).send({ message: 'EL USUARIO NO EXISTE' });
      }
      bcryptjs.compare(password, user.password)
        .then(match => {
          if (match) { // Si las contraseñas coinciden
            const payload = { // Se crea un objeto con los datos que se van a incluir en el token
              username: user.username,
              email: user.email,
              name: user.name,
              role: user.role
            };
            jwt.sign(payload, CONFIG.SECRET_TOKEN, function (error, token) { // Se genera el token y se envía en la respuesta
              if (error) {
                res.status(500).send({ error });
              } else {
                res.status(200).send({ message: 'Acceso', token });
              }
            });
          } else { // Si las contraseñas no coinciden
            res.status(401).send({ message: 'CONTRASEÑA INCORRECTA' }); // Se devuelve un error 401
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({ error });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ error });
    });
};


module.exports = {login};