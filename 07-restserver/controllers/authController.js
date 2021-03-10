const { response } = require("express");
const usuarioModel = require("../models/usuarioModel");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");

const login = async(req, res = response) => {
    
    const {correo, password} = req.body;

    try {

        /* Verificar si existe en DB la correo ||| stattus 400 bad request*/
        const user = await usuarioModel.findOne({correo});
        //console.log(user);
        if (!user) {
            return res.status(400).json({msg:'Este correo no esta registrado en DB'})
        }

        /* Verificar en DB si el usuario esta activo */
        if (!user.isActive) {
            return res.status(400).json({msg:'Este usuario esta desactivido'})
        }
        /* Verificar la contraseña */
        const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({msg:'La contraseña no es correcta'})
        }
        /* generar el JWT */
        const token = await generarJWT(user.id);


        res.json({
            msg: 'login ok', token, user
        })        
    } catch (error) {
        console.log(error);//status 500 internal server error
        return res.status(500).json({msg:'Habla con el administrador', error})
    }

}








module.exports = {
    login
}