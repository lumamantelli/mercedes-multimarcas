/* eslint-disable prettier/prettier */
// Estendendo a interface Request para incluir nossas propriedades personalizadas
import { JwtPayloadUsuario } from '../types/types';

declare global {
  namespace Express {
    interface Request {
      skipAuth?: boolean;
      user?: JwtPayloadUsuario;
    }
  }
}