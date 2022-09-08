import mongoose from "mongoose"; //importar mongoose

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    
    isAdmin: {
        type: Boolean,
        required: true, //si no se pone, no se puede crear un usuario sin ese campo
        default: false,

    }
},{
    timestamps: true, //crea dos campos, uno para cuando se creo el usuario y otro para cuando se actualizo
}); //crear un nuevo esquema de mongoose

const User = mongoose.model('User', userSchema); //crear un nuevo modelo de mongoose

export default User; //exportar el modelo para usarlo en otro archivo js que lo importe y lo use en otro componente