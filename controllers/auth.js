
//Para arreglar el problema del JS donde se te desaparece toda la intelligence de JS(Osea los archivos a elegir cuando escribes codigo 
// y que te ayudan a acortar el tiempo de escritura.)
const {response} = require('express');
const Usuario = require('../models/Usuario');



const crearUsuario = async(req, res = response )=>{
    
    const { email, password } = req.body;


    try {

        let usuario = await Usuario.findOne({ email })

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Ya Existe un usuario con ese correo!'
            });
        }

        usuario = new Usuario( req.body );
        await usuario.save();
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
         
        })

    } catch (error) {
        console.log(error)
         res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador',
         
        })
    }
   
}

const loginUsuario = (req, res = response)=>{

    const { email, password } = req.body; 

    res.status(202).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidarTokens = (req, res = response)=>{

    console.log('Se solicito el /')
    res.json({
        ok: true,
        msg: 'Renew'
    })
};


module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario: loginUsuario,
    revalidarTokens
}






