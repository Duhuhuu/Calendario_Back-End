const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

console.log(process.env)

//Crear el servidor express

const app = express();

//base de datos

dbConnection();

//CORS

app.use(cors())

//Lectura y parseo del body
app.use( express.json() );

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
