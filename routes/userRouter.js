import express from 'express';
import asyncHandler from 'express-async-handler'; 

const router = express.Router();
import User from '../models/userModel.js'; 


router.get('/',  
    asyncHandler (async(req, res) => {
    const users = await User.find({});
    throw new Error('Error');
    res.json(users); 
})); 

router.get('/:id', asyncHandler (async(req, res) => {
    const user = await User.findById(req.params.id); 
     if (user ) { 
        res.json(user ); 
        
    }else{ 
        return res.status(404).json({ msg: 'Product not found' }); //envia un mensaje de error
        throw new Error('Product not found'); //lanza un error
    }   

    res.json(user );
}))

export default router; //exporta el router para que sea utilizado en el server.js