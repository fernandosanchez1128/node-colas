const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        console.log("constructor")
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos = []

        let data = require('../data/data.json')

        console.log(data)
        if (data.hoy == this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos = data.ultimos
        } else {
            this.reiniciarConteo()
        }
    }

    ultimoTicket() {
        return `Ticket ${this.ultimo}`
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)
        this.grabarArchivo()
        return `Ticket ${this.ultimo}`
    }

    atenderTicket(escritorio) {
        if (this.tickets.length <= 0) {
            return null
        } else {
            let numeroTicket = this.tickets[0].numero
            this.tickets.shift()
            let atenderTicket = new Ticket(numeroTicket, escritorio)
                //al inicio del arreglo
            this.ultimos.unshift(atenderTicket);
            if (this.ultimos.length > 4) {
                this.ultimos.splice(-1, 1) //borra el ultimo
            }
            this.grabarArchivo()
            return atenderTicket
        }
    }

    getUltimos() {
        return this.ultimos
    }

    reiniciarConteo() {
        this.tickets = []
        this.ultimos = []
        this.ultimo = 0
        this.grabarArchivo()
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos: this.ultimos
        }
        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }


}


module.exports = {
    TicketControl
}