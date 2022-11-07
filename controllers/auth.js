
//Para arreglar el problema del JS donde se te desaparece toda la intelligence de JS(Osea los archivos a elegir cuando escribes codigo 
// y que te ayudan a acortar el tiempo de escritura.)
const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // General JWT
        const token = await generarJWT(usuario.id, usuario.name,)


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
         
        })

    } catch (error) {
        console.log(error)
         res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador',
         
        });
    }
   
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body; 

    try {

        const usuario = await Usuario.findOne({ email })

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese correo!'
            });
        }

        //confirmar los password
        const validPassword = bcrypt. compareSync(password, usuario.password );

        if(!validPassword){
            res.status(400).json({
                ok: false,
                msn: 'Password Incorrecto'
            });
        }

        // General JWT
        const token = await generarJWT(usuario.id, usuario.name,)
        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
           ok: false,
           msg: 'Comunicate con el administrador',
        
       })
    }

}

// Revalidar el JWT opcion 1
const revalidarTokens = async(req, res = response)=>{

    const uid = req.uid;
    const name = req.name;

    // Lo mismo de arriba, pero mas cortito
    //     const { uid, name } = req;

    const token = await generarJWT(uid, name,)

    // console.log('Se solicito el /')
    res.json({
        ok: true,
        uid, name,
        token
    })
};



module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario: loginUsuario,
    revalidarTokens
}






