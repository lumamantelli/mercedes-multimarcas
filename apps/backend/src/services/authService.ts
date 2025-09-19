/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import { JwtPayloadUsuario } from "../types/types";


const prisma = new PrismaClient();

export async function verifyAuthService(token: string): Promise<{ 
  user: JwtPayloadUsuario; 
}> {
  if (!token) {
    throw new Error('Token não fornecido');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET não definido');
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayloadUsuario | jwt.JwtPayload;
    
    // Buscar usuário baseado no tipo do token
    let user: JwtPayloadUsuario | null = null;
    
    // Verificar se é token de cidadão (tem tipo CIDADAO no payload)
    if ('tipo' in decoded && decoded.tipo === 'PADRAO') {
      // Para cidadão, buscar pelo ID do usuário principal  
      const usuarioPadrao = await prisma.usuario.findUnique({
        where: { id: (decoded as JwtPayloadUsuario).id },
      });

      if (usuarioPadrao) {
        user = {
          id: usuarioPadrao.id,
          nome: usuarioPadrao.nome,
          email: usuarioPadrao.email,
          telefone: usuarioPadrao.telefone,
          tipo: 'PADRAO' as const,
        };
      }
    } else {
      // Token de usuário padrão/admin
      const jwtPayload = decoded as JwtPayloadUsuario;
      const usuario = await prisma.usuario.findUnique({
        where: { id: jwtPayload.id },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
        }
      });
      
      if (usuario) {
        user = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          tipo: 'PADRAO' as const
        };
      }
    }

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return { user  };
  } catch {
    throw new Error('Token inválido ou expirado');
  }
}
