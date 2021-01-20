/***************************************************************************
 EN ESTE MODULO CREAMOS UN SERVIDOR CONVENCIONAL NODE PARA SOBRECARGARLO
 CON LAS FUNCIONES DEL SERVIDOR EXPRESS Y EL PAQUETE DE SOCKETS IO
 **************************************************************************/

//Importamos la libreria http de node para crear un servidor convencional node
const http = require('http');

//Importamos el paquete express para crear un servidor node express
//npm i express --save
const express = require('express');
const app = express();
//Creamos un servidor convencional node sobrecargandolo con el servidor express
let server = http.createServer(app);

//Importamos el paquete path para generar rutas absolutas
const path = require('path');
//Conseguimos la ruta abusoluta de la carpeta publica
const publicPath = path.resolve(__dirname, '../public');
//A travez del middleware publicamos la carpeta publica 
app.use(express.static(publicPath));

//Importamos el paquete de sockets 
//npm i socket.io --save
const socketIO = require('socket.io');
//Cargamos la funcion de servidor de sockets en socketServidor enviandole el objeto del servidor
//socketServidor se mantendra en escucha cumpliendo la funcion de servidor de sockets backend
//se declara con module.exports para ser una variable global para poderlo sobrecargar desde /sockets/socket.js
module.exports.socketServidor = socketIO(server);
//sobrecargamos el objeto socketServidor desde /sockets/socket.js
require('./sockets/socket.js');


//Indicamos el puerto de escucha del servidor node
//process.env.PORT es una variable publica publicada en heroku
const port = process.env.PORT || 3000;

//Iniciamos el puerto de escucha del servidor node convencional sobrecargado con express
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);

});