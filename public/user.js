//modelo, controlador, por el usuario que se loguea, y la contraseña que se ingresa en el formulario 

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const rounds = 10;

const usersschema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})


usersschema.pre('save', function(next) {
   if(this.isNew || this.isModified('password')) {
       const document = this;
       bcrypt.hash(document.password, rounds, function(err, hashedPassword) {
           if(err) {
               next(err); //llamamos a next con el error que nos devuelve bcrypt 
           } else {
               document.password = hashedPassword; //guardamos la contraseña encriptada en la base de datos 
               next(); //llamamos a next para que continue con la ejecucion del codigo 
           }
       });
   }else{
         next();
   }
});

usersschema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) { //comparamos la contraseña ingresada con la encriptada en la base de datos
        if(err) { //si hay un error 
            callback(err); //llamamos a callback con el error que nos devuelve bcrypt
        } else {
            callback(err, same); //same es true o false dependiendo si la contraseña ingresada es la misma que la encriptada en la base de datos 
        }
    });
}

module.exports = mongoose.model('user', usersschema); //lo llamamos user y le pasamos el shchema que creamos anteriormente
