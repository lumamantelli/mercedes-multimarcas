/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura';

export interface TokenPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: TokenPayload): string {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '4h', // Token expira em 4 horas
      issuer: 'mercedes-app',
      audience: 'mercedes-users',
    });
    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao gerar token:', error.message);
      throw new Error(`Erro ao gerar token: ${error.message}`);
    } else {
      console.error('Erro desconhecido ao gerar token:', error);
      throw new Error('Erro desconhecido ao gerar token');
    }
  }
}

export function verifyToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return payload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao verificar token:', error.message);
      throw new Error(`Token inválido: ${error.message}`);
    } else {
      console.error('Erro desconhecido ao verificar token:', error);
      throw new Error('Token inválido');
    }
  }
}

export function refreshToken(token: string): string {
  try {
    const payload = verifyToken(token);
    return generateToken(payload);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao renovar token:', error.message);
      throw new Error(`Erro ao renovar token: ${error.message}`);
    } else {
      console.error('Erro desconhecido ao renovar token:', error);
      throw new Error('Erro desconhecido ao renovar token');
    }
  }
}