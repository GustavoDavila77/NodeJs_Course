const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');
const chat = require('../components/chat/network');

//función que añade todas las rutas
//server -- es el servidor de express
const routes = function(server) {
    //todas las llamadas a message las gestiona en el componente de message
    server.use('/message',message); 
    server.use('/user',user);
    server.use('/chat',chat);
}

module.exports = routes;

