const {response} = require('express');

const usuariosGet = (req, res = response) => {//end point get
    res.status(203).json({ 
        msg: 'get API! - controlador'
    });
}

const usuariosPost = (req, res) => {//end point post
    res.status(201).json({ 
        msg: 'post API! - Controlador'
    });
}
const usuariosPut = (req, res) => {//end point put
    console.log('in put')
    res.status(202).json({ 
        msg: 'put API! - Controlador'
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