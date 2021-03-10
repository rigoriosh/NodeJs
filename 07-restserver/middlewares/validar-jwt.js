const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const validarJWT = async(req = request, resp = response, next) => {

    const token = req.header('x-token')
    //console.log(token);
    if (!token) {
        return resp.status(401).json({msg:'Faltó el token'})
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        /* leer usuario del modelo q corresponde al uid */
        const usuario = await usuarioModel.findById(uid);   
        if(!usuario) return resp.status(401).json({msg:'El usuario para este token no existe en la DB'})
        /* verificar si el usuario esta activo */
        if (!usuario.isActive) {
            return resp.status(401).json({
                msg:`El usuario '${usuario.nombre}' de este token esta desactivado 
                para realizar la operación de eliminar el usuario con id No: ${req.params.id}`
            })
        }
        //console.log(usuario)
        req.usuario = usuario;
        req.uid = uid;
        
        next()
    } catch (error) {
        console.log(error);
        resp.status(401).json({msg: 'Token no valido', error});
    }    
}


module.exports = {
    validarJWT
}