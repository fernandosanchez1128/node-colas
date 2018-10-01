//Comando para establecer la comunicacion
var socket = io();
//cuando el cliente se conecta
socket.on('connect', function() {
        console.log('Conectado al servidor')
    })
    //cuando el cleinte se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor')
})

socket.on('estadoActual', function(estado) {
    console.log('reproduciendo audio')
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    console.log(estado.ultimos)
    let ultimos = estado.ultimos
    for (i = 0; i < ultimos.length; i++) {
        $(`#lblTicket${i+1}`).text(`Ticket ${ultimos[i].numero}`)
        $(`#lblEscritorio${i+1}`).text(`Escritorio ${ultimos[i].escritorio}`)
    }
})