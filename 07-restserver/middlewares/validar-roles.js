const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {

    const user = req.usuario; //esta info se setio en el validar-jwt middleware
    // status 500 es 'internal server error'
    if(!user) return res.status(500).json({msg: 'El token no se logró validar'});

    const {nombre, rol} = user;

    if (rol !== 'ROL_owner') return res.status(401).json({
        msg: `${nombre} no tiene permisos de administrador para desactivar otros usuarios `
    })


    
    next();
}

const tieneRole = (...roles) => {
    
    return (req = request, res = response, next) => {
        /* console.log(roles);
        console.log(req.usuario.rol) */

        if(!req.usuario) return res.status(500).json({msg: 'El token no se logró validar'});

        if(!roles.includes(req.usuario.rol)) return res.status(401).json(//401 => 'no operace'
           {
               msg: 'No existen permisos para este rol'
            })
        
        next()
    }
}



module.exports = {
    esAdminRole,
    tieneRole
};