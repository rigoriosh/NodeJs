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
    socket.emit('estado-actual', ticketControl.ultimos4);
    

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
        }
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

