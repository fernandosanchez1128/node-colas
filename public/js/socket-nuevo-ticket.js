//Comando para establecer la comunicacion
var socket = io();
//cuando el cliente se conecta
var label = $('#lblNuevoTicket')
socket.on('connect', function() {
        console.log('Conectado al servidor')
    })
    //cuando el cleinte se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor')
})

socket.on('estadoActual', function(estado) {
    label.text(estado.actual)
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguiente) {
        label.text(siguiente)
    })
})