/* eslint-disable prettier/prettier */
import { Router } from "express";
import { verifyAuthController } from "../controllers/authController";

const router = Router();

router.get('/auth/verify', verifyAuthController);

export default router;