const {response} = require('express');
const bcryptj = require('bcryptjs');

const UsuarioModel = require('../models/usuarioModel');


const usuariosGet = async(req, res = response) => {//end point get
    let {q, name = 'no se recibió el nombre', apikey, limite = 5,
        desde = 0,  ...rest} = req.query;
    //console.log(req.query);    
    if(isNaN(Number(desde))) desde = 0
    if(isNaN(Number(limite))) limite = 5
    const where = {isActive: true}
/* 
    const usuarios = await UsuarioModel.find(where)
        .skip(Number(desde))
        .limit(Number(limite));
    const totalRegistros = await UsuarioModel.countDocuments(where);
 */
    //const resp = await Promise.all([
    const [usuarios, totalUsers] = await Promise.all([
        UsuarioModel.find(where)
            .skip(Number(desde))
            .limit(Number(limite)),
        UsuarioModel.countDocuments(where)
    ]);

    res.status(203).json({ 
        msg: 'get API! - controlador',
        q, name, apikey, 
        //resp
        totalUsers, usuarios, 
    });
} 
const usuariosPost = async(req, res) => {//end point post
    
    const body = req.body;
    const {nombre, correo, password, rol, img} = body;
    const usuarioModel = new UsuarioModel({nombre, correo, password, rol, img});    

    /* 
        encriptar el password o has del password
        el salt es el nivel de complijidad del hast
        * el hash para encriptar en una sola via
     */
    const salt = bcryptj.genSaltSync();
    usuarioModel.password = bcryptj.hashSync(password, salt);
    //save in DB
    await usuarioModel.save();
    res.status(201).json({ 
        msg: 'post API! - Controlador all ok',
        usuarioModel
    });
}
const usuariosPut = async(req, res) => {//end point put update
    const {id} = req.params;
    const {_id, password, google, correo, ...restDeInfo} = req.body;//solo va a procesar la info que queda en restDeInfo
    // TODO: validar a DB
    if (password) {
        //Encriptar password
        const salt = bcryptj.genSaltSync();
        restDeInfo.password = bcryptj.hashSync(password, salt);
    }
    const dataUsuarioActualizada = await UsuarioModel.findByIdAndUpdate(id, restDeInfo);
    res.status(202).json({ 
        msg: 'put API! - Controlador updated',
        dataUsuarioActualizada
    });
}
const usuariosPatch = (req, res) => {//end point patch
    res.status(205).json({ 
        msg: 'patch API! - Controlador'
    });
}
const usuariosDelete = async(req, res) => {//end point delete
    //console.log('in delete');
    const {id} = req.params;
    //console.log(id);

    /* Borrado fisicamente, no es utilizado por que se pierde la integridad referencial */
    //const usuario = await UsuarioModel.findByIdAndDelete(id);

    //opcion mas adecuada para eliminar usuarios
    const usuario = await UsuarioModel.findByIdAndUpdate(id, {isActive: false});
    
    res.status(201).json({ 
        msg: 'delete API! - Controlador',
        id,
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};