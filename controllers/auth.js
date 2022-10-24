
//Para arreglar el problema del JS donde se te desaparece toda la intelligence de JS(Osea los archivos a elegir cuando escribes codigo 
// y que te ayudan a acortar el tiempo de escritura.)
const {response} = require('express');


const crearUsuario = (req, res = response )=>{

    res.json({
        ok: true,
        msg: 'Registro'
    })
}

const loginUsuario = (req, res = response)=>{

    res.json({
        ok: true,
        msg: 'login'
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






