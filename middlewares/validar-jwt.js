const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) =>{
    //x-token  headers

const token = req.header('x-token');
// console.log(token)

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        //Tomo los valores de la Request, la destructuro y tomo los valores que yo quiero.
        //uid y name.
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

        console.log(uid,name);

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Token no valido'
        })

    }
    next();
}



module.exports = {
    validarJWT
}





