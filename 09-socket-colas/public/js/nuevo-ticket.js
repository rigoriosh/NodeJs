//Referencias HTML

const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnCrear = document.querySelector("button");

const socket = io();



socket.on('connect', () => {
    console.log('Conectado');

    btnCrear.disabled = false;

    consultarUltimoTicket();    

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');

    btnCrear.disabled = true;
});


/* socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
}) */


btnCrear.addEventListener( 'click', () => {
    console.log('in Create');
    /* const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    } */
    
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        console.log('Desde el server', ticket);
        lblNuevoTicket.innerText = ticket;
    });

});


const consultarUltimoTicket = () => {
    socket.emit('consultar-ultimo-ticket', ( ultimoTicket ) => {
        console.log('El ultimo ticket fue el: ', ultimoTicket);
        let textoView = 'Cargando...'
        if(ultimoTicket > 0 ) textoView = 'Ultimo Ticket es : ' + ultimoTicket;
        lblNuevoTicket.innerText = textoView;
    });
}