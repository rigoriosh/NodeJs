const { Router } = require("express");
const {check} = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete 
    } = require("../controllers/usuariosControler");
const { esRolValido, emailExiste, existUserById } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");

///////////////////////////
const router = Router();

router.get('/', usuariosGet);
//los check son validaciones q se deben pasar para ejecutar el controlador
router.post('/', [
    check('nombre', 'El nombre es obligatoriooo').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({min:6}),
    //check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom((correo) => emailExiste(correo)),
    //check('rol', 'El rol no es valido').isIn(['ROL_owner', 'ROL_adminBar', 'ROL_user']),
    //check('rol').custom((rol) => esRolValido(rol)),
    check('rol').custom(esRolValido),
    validarCampos // validarCampos monitorea si todos los cheks pasaron
], usuariosPost) // usuariosPost es el controlador para la ruta '/'

//router.put('/', usuariosPut)
router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);
router.put('*', (req, res) => {//end point put    
    res.status(202).json({ 
        msg: 'Error: no enviaste el id '
        
    });
})

router.patch('/', usuariosPatch)
router.delete('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
], usuariosDelete)




module.exports = router;