const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-en-cola', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-en-cola', ticketControl.tickets.length);
        //TODO: Notificar q hay un ticket pendiente de asiganar

    })

    socket.on('consultar-ultimo-ticket', (callback) => {
        callback(ticketControl.ultimoTicket);
    })
    
    socket.on('atender-ticket', (payload, callback) => {
        console.log(payload);
        const {escritorio} = payload;
        if (!escritorio) {
            return callback(
                {
                    ok: false,
                    msg: 'El escritorio es requerido'}
            )
        }          
        const turno = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4); //el broadcast espara emitir a varias pantallas
        if (!turno) {
            callback({
                ok: false,
                msg: 'Ya no hay turnos pendientes'
            })
        }else{
            callback({
                ok: true,
                turno
            })
            socket.broadcast.emit('tickets-en-cola', ticketControl.tickets.length);
        }
    })

    socket.on('ticketCola', (callback)=>{callback(ticketControl.tickets.length)});
        
}



module.exports = {
    socketController
}

