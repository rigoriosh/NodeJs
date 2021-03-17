const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //TODO: Notificar q hay un ticket pendiente de asiganar

    })

    socket.on('consultar-ultimo-ticket', (callback) => {
        callback(ticketControl.ultimoTicket);
    })
    
    //console.log('Cliente conectado', socket.id );

    /* socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    }); */
/* 
    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })
 */
    

}



module.exports = {
    socketController
}

