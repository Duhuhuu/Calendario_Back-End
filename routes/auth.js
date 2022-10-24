/*
    Rutas de Usuario    s / Auth
    host + /api/auth
 */

const { Router } = require('express');

const router = Router();

const { crearUsuario, loginUsuario, revalidarTokens } = require('../controllers/auth');

router.post('/new', crearUsuario );


router.post('/', loginUsuario);


router.get('/renew', revalidarTokens );

module.exports = router;