const socketController = (socket) => {
    console.log('conected client', socket.id);

    socket.on('disconnect', ()=>{
        console.log('disconnect Cliente', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback)=>{
        //console.log({payload});
        socket.broadcast.emit('sendmsmtoclient', payload); // el emit envia a todos los clientes
        callback({msm:'ok msm'/* , date: Date() */});
    })
    //socket.disconect();
}

module.exports = {
    socketController
}