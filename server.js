//se trae el modulo express
//otra forma es import expres form 'express'; 
//es una sistaxis de Ecma script 6


//el sistema nativo de node es el de require
const express = require('express');
//body-parser es un modulo, que permite trabajar con el body de la petición
const bodyParser = require('body-parser');

const db = require('./db');
//el router nos permite separar cabeceras, metodos, url ,etc --> separar peticiones
const router = require('./network/routes');
// este es el router antiguo
//const router = require('./components/message/network');

//enviamos la url a db para que conecte con Mongodb Atlas
db('mongodb+srv://atlas-admin:admintavo@atlastar-vkqae.mongodb.net/Telegrom?retryWrites=true&w=majority');

//se inicializa la app express
var app = express();
//esto indica que vamos a poder recibir json
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: false}));
//ahora tenemos router en la app de express
// app.use(router);//antes estamos utilizando app.use para utilizar los midelweres de express
//ahora
//se le pasa el servidor de express al router 
//para que se encargue de crear todas la rutas necesarias
router(app); 




app.use('/app', express.static('public'));

//elegimos un puerto, para que escuche 
app.listen(3000);
console.log('La app esta escuchando en http://localhost:3000');





