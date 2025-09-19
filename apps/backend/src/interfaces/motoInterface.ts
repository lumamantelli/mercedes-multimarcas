/* eslint-disable prettier/prettier */
import { StatusVeiculo } from 'generated/prisma';

export default interface CriarMotoInput {
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  partida: string;
  marchas: string;
  refrigeracao: string;
  freio: string;
  estilo: string;
  alimentacao: string;
  motor: string;
  cilindrada: string;
  preco: number;
  status: StatusVeiculo;
  troca: string;
  sobre: string;
  usuarioId: string;
  images?: string[];
}
