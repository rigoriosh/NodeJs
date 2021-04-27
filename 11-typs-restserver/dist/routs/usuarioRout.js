"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const router = express_1.Router();
// definir los 5 enpoints
router.get('/prueba', usuariosController_1.rutaPrueba);
router.get('/', usuariosController_1.getUsuarios); // localhost:2113/api/usuarios
router.get('/:id', usuariosController_1.getUsuario); // localhost:2113/api/usuarios/1235
router.post('/', usuariosController_1.postUsuario); // localhost:2113/api/usuarios pero con post
router.put('/:id', usuariosController_1.putUsuario); // localhost:2113/api/usuarios/564 pero con put
router.delete('/:id', usuariosController_1.deleteUsuario); // localhost:2113/api/usuarios/564 pero con delete
exports.default = router;
//# sourceMappingURL=usuarioRout.js.map