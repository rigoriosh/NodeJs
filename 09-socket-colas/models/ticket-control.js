const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{


    constructor(){
        this.ultimoTicket=0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){
        return {
            ultimoTicket:this.ultimoTicket,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4
        }
    }

    init(){
        const {ultimoTicket, hoy, tickets, ultimos4} = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimoTicket = ultimoTicket;
            this.ultimos4 = ultimos4;
        }else {
            // es otro dia
            this.guardarDB()
        }        
    }

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    siguiente(){
        this.ultimoTicket += 1;
        const ticket = new Ticket(this.ultimoTicket, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return 'Ticket actual ' + this.ultimoTicket;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0)return null;

        const turno = this.tickets.shift();
        turno.escritorio = escritorio;

        if (this.ultimos4.length < 5) this.ultimos4.unshift(turno);

        console.log(this.ultimos4);
        this.guardarDB();

        return turno;
    }
}


module.exports = TicketControl;