/* eslint-disable prettier/prettier */
import { Router } from "express";
import { deleteUsuario, getUsuarios, postLogin, postLogout, postUsuario, putUsuario } from "../controllers/usuarioController";


const router = Router();

router.get("/usuarios", getUsuarios);
router.post("/usuarios", postUsuario);
router.put("/usuarios/:id", putUsuario);
router.delete("/usuarios/:id", deleteUsuario);
router.post("/login", postLogin);
router.post("/logout", postLogout);


export default router;