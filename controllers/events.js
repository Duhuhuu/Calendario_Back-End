const { response } = require('express');

const  Evento = require('../models/Evento');

const getEventos = async( req, res=response ) => {

    const eventos = await Evento.find()
                                 .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    })
}


const crearEvento = async( req, res=response) => {


   const evento = new Evento(req.body);

   try {
   
    evento.user = req.uid;

    const eventoGuardado = await evento.save();
    res.json({
        ok: true,
        eventoGuardado
    })

   } catch (error) {
        console.log(error)
        res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
        })
   }

}

const actualizarEvento = async( req, res=response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    const evento = await Evento.findById(eventoId);
    try {
        
        if( !evento ){
         return res.status(404).json({
                ok: false,
                msg: 'Evento no Existe por ese ID'
                });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
            });
    } 

    if( evento.user.toString() !== uid  ){
        return res.status(401).json({
            ok: false,
            msg: ' No tiene Privilegio de editar este evento'
        })
    }

    const newEvent = {
        ...req.body,
        user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, newEvent, {new: true} );

    res.json({
        ok:true,
        evento: eventoActualizado

    });

}


const eliminarEvento = async( req, res=response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    const evento = await Evento.findById(eventoId);
    try {
        
        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no Existe por ese ID'
                });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
            });
    } 

    if( evento.user.toString() !== uid  ){
        return res.status(401).json({
            ok: false,
            msg: ' No tiene Privilegio de Eliminar este evento'
        })
    }

  
    const eventoActualizado = await Evento.findOneAndDelete( eventoId, {new: true} );

    res.json({
        ok:true,
        evento: eventoActualizado

    });



}


module.exports = { getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento }