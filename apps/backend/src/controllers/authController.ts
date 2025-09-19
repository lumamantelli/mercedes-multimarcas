/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import { verifyAuthService } from "../services/authService";

export async function verifyAuthController(req: Request, res: Response) {
  try {
    // Pegar token do cookie ou header
    const token = req.cookies?.token as string || req.headers.authorization?.split(' ')[1];
    
    if (!token || typeof token !== 'string') {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const result = await verifyAuthService(token);
    res.status(200).json(result);
    return;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    res.status(401).json({ error: 'Token inválido ou expirado' });
    return;
  }
}