const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        callback(ticketControl.siguiente())
    })
    client.on('atenderTicket', (data, callback) => {
        let escritorio = data.escritorio
        if (!escritorio) {
            callback({
                ok: false,
                mensaje: 'El escritorio es necesario'
            })
        }
        callback({
            ok: true,
            ticket: ticketControl.atenderTicket(escritorio)
        })

        client.broadcast.emit('estadoActual', {
            actual: ticketControl.ultimoTicket(),
            ultimos: ticketControl.getUltimos()
        })
    })

    client.emit('estadoActual', {
        actual: ticketControl.ultimoTicket(),
        ultimos: ticketControl.getUltimos(),
    })



});