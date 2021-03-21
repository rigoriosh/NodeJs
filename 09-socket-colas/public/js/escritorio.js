//Referencias HTML
const lblEscritorio = document.querySelector('h1');//tomar el primer h1 q encuentre en el DOM
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');



divAlerta.style.display = 'none';


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'; //redirecciona a la pagina index.html
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo)=>{
    //lblNuevoTicket.innerText = 'Ticke'
})

btnAtender.addEventListener('click', ()=>{
    console.log('in btn');
    const payload = {escritorio};
    socket.emit('atender-ticket', payload, (res)=>{
        console.log(res);
        const {ok, turno, msg} = res;
        if (!ok) {
            lblTicket.innerText = 'nadie';
            return divAlerta.style.display = 'block';
        }
        lblTicket.innerText = 'Ticket ' + turno.numero;
        socket.emit('ticketCola', (res)=>{lblPendientes.innerText = res;});
    })
});

socket.on('tickets-en-cola', (payload)=>{
    lblPendientes.innerText = payload;
});

/* socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
}) */


/* btnCrear.addEventListener( 'click', () => {
    console.log('in Create');
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        console.log('Desde el server', ticket);
        lblNuevoTicket.innerText = ticket;
    });

}); */


const consultarUltimoTicket = () => {
    socket.emit('consultar-ultimo-ticket', ( ultimoTicket ) => {
        console.log('El ultimo ticket fue el: ', ultimoTicket);
        let textoView = 'Cargando...'
        if(ultimoTicket > 0 ) textoView = 'Ultimo Ticket es : ' + ultimoTicket;
        lblNuevoTicket.innerText = textoView;
    });
}