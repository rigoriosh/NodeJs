const { Router } = require("express");
const {check} = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete 
    } = require("../controllers/usuariosControler");


const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 letras').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
],usuariosPost)

//router.put('/', usuariosPut)
router.put('/:id', usuariosPut)
router.put('*', (req, res) => {//end point put    
    res.status(202).json({ 
        msg: 'put API! - Error'
        
    });
})

router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)




module.exports = router;