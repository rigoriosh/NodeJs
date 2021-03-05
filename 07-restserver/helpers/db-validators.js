const roleModel = require("../models/roleModel");
const { validationResult } = require('express-validator');
const usuarioModel = require("../models/usuarioModel");


const esRolValido = async(rol='') => {
    const exisiteRol = await roleModel.findOne({rol});
    if(!exisiteRol) throw new Error(`El rol ${rol} no es valido`);
}

const emailExiste = async(correo='') => {
    const existeEmail = await usuarioModel.findOne({correo});    
    if(existeEmail ) throw new Error(`El correo ${correo} ya existe`);
}

const existUserById = async(Id='') => {
    const existeId = await usuarioModel.findById(Id);    
    if(!existeId ) throw new Error(`El Id ${Id} no existe`);
}

module.exports = {
    esRolValido,
    emailExiste,
    existUserById
}