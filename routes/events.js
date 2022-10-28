// Events Routers
const { Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por la validacion del JWT

const router = Router();

router.use( validarJWT );

//Obtener Eventos.
router.get('/',getEventos);

//Crear un nuevo evento
router.post('/', [ // Middelware
check('title', 'El title es obligatorio').not().isEmpty(),
check('start', 'La fecha de inicio es obligatoria').custom(isDate),
check('end', 'La fecha de Finalizacion es obligatoria').custom(isDate),

validarCampos

], crearEvento);

//Actualizar Evento
router.put('/:id',[ // Middelware
check('title', 'El title es obligatorio').not().isEmpty(),
validarCampos

], actualizarEvento);
//Borar evento
router.delete('/:id', eliminarEvento);


module.exports= router;