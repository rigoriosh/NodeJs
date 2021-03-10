const jwt = require('jsonwebtoken');

const generarJWT = (uid='') => {

    return new Promise((resolve, reject) => {
        const payload = {uid};
        const opciones = {expiresIn: '4h'}
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, opciones, (error, token)=>{
            if (error) {
                console.log(error);
                reject('No se puedo generar el JWT');
            }else{
                resolve(token);
            }
        })
    });
}



module.exports = {
    generarJWT
}