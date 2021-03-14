console.log('Hi rigo');

//referencias del html
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');
const textIn  = document.querySelector('#textIn');

const socket = io();

//listeners u observables

socket.on('connect', ()=> {
    console.log('conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', ()=> {
    console.log('desconectado');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('sendmsmtoclient', (payload)=>{//esta pendiente del servidor por medio de la palabra sendmsmtoclient 
    console.log({payload});
    const j = JSON.stringify(payload);
    textIn.innerHTML = payload.mensaje;
})


btnEnviar.addEventListener('click', ()=> {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        /* id: Math.random(),
        fecha: Date() */
    }
    socket.emit('enviar-mensaje', payload, (res) => {console.log({res});});
});