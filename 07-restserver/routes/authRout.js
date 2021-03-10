const { Router } = require("express");
const {check} = require('express-validator');
const { login } = require("../controllers/authController");
const { emailExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);



module.exports = router;