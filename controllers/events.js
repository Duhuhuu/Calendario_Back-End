const { response } = require('express');


const getEventos = ( req, res=response ) => {

    res.json({
        ok: true,
        msg: 'getEventos'
    })
}


const crearEvento = ( req, res=response) => {

    // Verificar que tenga el Evento
    console.log(req.body)

    res.json({
        ok: true,
        msg: 'CrearEvento'
    })
}

const actualizarEvento = ( req, res=response) => {

    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })
}

const eliminarEvento = ( req, res=response) => {

    res.json({
        ok: true,
        msg: 'eliminarEvento'
    })
}


module.exports = { getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento }