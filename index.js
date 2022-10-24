const express = require('express');
require('dotenv').config();

console.log(process.env)

//Crear el servidor express

const app = express();

//Directorio Publico
app.use( express.static('public') );

//rutas

app.use( '/api/auth', require('./routes/auth') );
//TODO: auth // crear, login, renew
//TODO: CRUD: Eventos.



//escuchar peticiones

app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
} );
