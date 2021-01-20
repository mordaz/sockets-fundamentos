//Importamos el socketServidor desde server.js principal
const { socketServidor } = require('../server.js');

//Generamos una funcion para monitorear las conexiones de clientes
socketServidor.on('connection', (client) => {

    //Evento ejecutado al conectar
    console.log('Usuario conectado');

    //Enviar mensaje al cliente de bienvenida
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido al servidor'
    });

    //Creamos un evento que se dispare al desconectar
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Creamos un evento que se dispare al recibir un mensaje del cliente
    //callback es el tercer parametro enviado por el cliente
    //para confirmar que se recibio la informacion
    client.on('enviarMensaje', (data, callback) => {
        console.log('Mensaje recibido');
        console.log(data);

        //Al recibir un mensaje del cliente lo respondonderemos a todos los clientes conectados
        client.broadcast.emit('enviarMensaje', data);

        /*
        //procesamos la informacion recibida del cliente
        if (mensaje.usuario) {
            //si todo es correcto ejecutamos el callback para notificar 
            //que se proceso la informacion correctamente
            callback({
                ok: true,
                mensaje: 'Se proceso correctamente la solicitud por el servidor'
            });
        }
        //en caso de no procesar correctamente la informacion 
        else {
            //ejecutamos el callback para notificar 
            //que no se proceso la informacion correctamente
            callback({
                ok: false,
                mensaje: 'Algo salio mal'
            });
        }
        */
    });
});