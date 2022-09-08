import bcrypt from 'bcryptjs'; 

const users = [
    {
        name: 'admin',
        email: 'admin@correo.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'moiso',
        email: 'moiso@correo.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'david',
        email: 'david@correo.com',
        password: bcrypt.hashSync('123456', 10), 
        
    }

]

export default users;