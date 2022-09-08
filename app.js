const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); 

const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); 
const user = require('./public/user');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb://localhost:27017/test'; 

mongoose.connect(mongo_uri, function(err) {
    if (err) {
        throw err; //throw es para que el programa se detenga en este punto y no siga ejecutando el codigo 
    } else {
        console.log('Connectado a mongo');
    }
});

app.post('/register', (req,res)=>{
   const {username, password} = req.body;

   const user = new user({
       username,
       password
   });

   user.save(function(err){
         if(err){
              res.send('Error al registrar');
         }else{
              res.send('Usuario registrado');
         }
   }); 

  
})

app.post('/authenticate', (req,res)=>{ //recibimos los datos del formulario
    const {username, password} = req.body; //guardamos los datos en una constante

    user.findOne({username}, function(err, user){ //buscamos el usuario en la base de datos para validar acceso 
        if(err){
            res.send('Error al autenticar');
        }else{
            if(user){
                user.isCorrectPassword(password, function(err, same){
                    if(err){
                        res.send('Error al autenticar');
                    }else{
                        if(same){
                            res.send('Autenticado');
                        }else{
                            res.send('Contraseña incorrecta');
                        }
                    }
                });
            }else{
                res.send('Usuario no existe');
            }
        }

    })

    
})

app.get('/', (req, res) => {

})
app.listen(3000,()=>{
    console.log("server iniciado") // eslint-disable-line no-console
})

module.exports = app;