/*
    Rutas de Usuario    s / Auth
    host + /api/auth
 */

const { Router } = require('express');

const { check } = require('express-validator');

const router = Router();

const { crearUsuario, loginUsuario, revalidarTokens } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/new', 
    [ // Middelware
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'La Password debe de ser de 6 caracteres o mas').isLength({min: 6}),
        validarCampos
    
    ],
    crearUsuario
);


router.post('/', 
    [ // Middelware
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La Password debe de ser de 6 caracteres o mas').isLength({min: 6}),
    validarCampos
    ],
    loginUsuario
);


router.get('/renew', revalidarTokens );

module.exports = router;