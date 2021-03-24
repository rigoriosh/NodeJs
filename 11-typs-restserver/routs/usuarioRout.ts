import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuariosController";

const router = Router();

// definir los 5 enpoints

router.get(      '/', getUsuarios); // localhost:2113/api/usuarios
router.post(     '/', postUsuario); // localhost:2113/api/usuarios pero con post
router.get(   '/:id', getUsuario); // localhost:2113/api/usuarios/1235
router.put(   '/:id', putUsuario); // localhost:2113/api/usuarios/564 pero con put
router.delete('/:id', deleteUsuario); // localhost:2113/api/usuarios/564 pero con delete
export default router;