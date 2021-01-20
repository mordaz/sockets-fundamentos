// Declaramos el servidor de sockets
// io es el objeto declarado del lado del servidor backend
let socketCliente = io();

// Definimos un evento para notificar la conexion con el servidor
// El evento se dispara en automatico cuando logre hacer conexion
socketCliente.on('connect', function() {
    console.log('Nos hemos conectado al servidor io :)');
});

// Definimos un evento para notificar la desconexion con el servidor
// El evento se  dispara en automatico cuando se genere una desconexion
socketCliente.on('disconnect', function() {
    console.log('Se ha perdido conexion con el servidor io :(');
});

//Definimos un evento para escuchar informacion del servidor
socketCliente.on('enviarMensaje', function(mensaje) {
    console.log('Servidor', mensaje);
});

// Creamos una funcion para enviar una notificacion al servidor con un objeto
socketCliente.emit('enviarMensaje', {
    usuario: 'Emmanuel',
    mensaje: 'Hola Mundo ;)'
        // Como tercer argumento añadimos una funcion callback para verificar
        // si se proceso el mensaje correctamente desde el servidor
}, function(respuesta) {
    console.log('respuesta server: ', respuesta);
});