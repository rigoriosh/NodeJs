"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuarioModel_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarioModel_1.default.findByPk(id);
    if (usuario) {
        res.json({
            msg: 'getUsuario',
            id,
            usuario
        });
    }
    else {
        res.status(400).json({ msg: `Usuario con id: ${id}, no exisiste` });
    }
});
exports.getUsuario = getUsuario;
// type usuario = { nombre: string, email: string,  estado: boolean}
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuarioModel_1.default.findOne({ where: { email: body.email } });
        if (existeEmail)
            return res.status(400).json({ msg: 'El correo ya esxite' });
        const usuario = new usuarioModel_1.default(body);
        yield usuario.save();
        res.json({
            msg: 'postUsuario',
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'talk to manager' });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuarioModel_1.default.findByPk(id);
        if (!usuario)
            return res.status(400).json({ msg: 'El usuario no existe' });
        yield usuario.update(body);
        res.json({
            msg: 'updated Usuario',
            body,
            id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'talk to manager' });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarioModel_1.default.findByPk(id);
        if (!usuario)
            return res.status(400).json({ msg: 'El usuario no existe' });
        /* forma de eliminar totalmente de la db */
        //usuario.destroy();
        /* forma de elimiar registro manteniendo la integridad referencia de la DB */
        yield usuario.update({ estado: false });
        res.json({
            msg: 'deleteUsuario',
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'talk to manager' });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuariosController.js.map