/* eslint-disable prettier/prettier */
export interface JwtPayloadUsuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: 'PADRAO' | 'ADMINISTRADOR';
}

export type UserType = 'PADRAO' | 'ADMINISTRADOR';

export type StatusVeiculo = 'DISPONIVEL' | 'VENDIDO' ;


