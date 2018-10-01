//Comando para establecer la comunicacion
var socket = io();

var searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('EL es escritorio es necesario')
}

var escritorio = searchParams.get('escritorio')
var label = $('small')
$('h1').text(`Escritorio ${escritorio}`)

//cuando el cliente se conecta
socket.on('connect', function() {
        console.log('Conectado al servidor')
    })
    //cuando el cleinte se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor')
})


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, function(resp) {
        console.log(resp)
        if (!resp.ok) {
            alert(resp.mensaje)
        } else {
            let ticket = resp.ticket
            if (!ticket) {
                alert('no hay más tickets')
                label.text('no hay más tickets')
                return;
            }
            label.text(`ticket: ${ticket.numero}`)
        }

    })
})