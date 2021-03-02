const {response} = require('express');
const bcryptj = require('bcryptjs');

const UsuarioModel = require('../models/usuarioModel');
const { validationResult } = require('express-validator');

const usuariosGet = (req, res = response) => {//end point get
    const {q, name = 'no name', apikey} = req.query;
    res.status(203).json({ 
        msg: 'get API! - controlador',
        q, name, apikey
    });
} 
const usuariosPost = async(req, res) => {//end point post
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    const body = req.body;
    const {nombre, correo, password, rol, img} = body;
    const usuarioModel = new UsuarioModel({nombre, correo, password, rol, img});
    /* 
        verificar si el coreo existe
     */
    const existeEmail = await UsuarioModel.findOne({correo});
    if(existeEmail ) return res.status(400).json({msg: 'El correo ya existe'}) //finaleza

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
        msg: 'post API! - Controlador',
        usuarioModel
    });
}
const usuariosPut = (req, res) => {//end point put
    const {id} = req.params;
    res.status(202).json({ 
        msg: 'put API! - Controlador',
        id
    });
}
const usuariosPatch = (req, res) => {//end point patch
    res.status(205).json({ 
        msg: 'patch API! - Controlador'
    });
}
const usuariosDelete = (req, res) => {//end point delete
    console.log('in delete')
    res.status(204).json({ 
        msg: 'delete API! - Controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};