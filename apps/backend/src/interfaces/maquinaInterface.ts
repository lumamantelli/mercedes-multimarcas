/* eslint-disable prettier/prettier */
import { StatusVeiculo } from 'generated/prisma';

export default interface CriarMaquinaInput {
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  tracao: string;
  cabine: string;
  motor: string;
  direcao: string;
  preco: number;
  status: StatusVeiculo;
  troca: string;
  sobre: string;
  usuarioId: string;
  imagemUrl?: string[];
}
