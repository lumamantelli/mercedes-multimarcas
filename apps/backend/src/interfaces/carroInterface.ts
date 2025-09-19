/* eslint-disable prettier/prettier */
import { StatusVeiculo } from 'generated/prisma';

export default interface CriarCarroInput {
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  motor: string;
  tracao: string;
  cambio: string;
  cabine: string;
  fplaca: string;
  ipva: string;
  licenciamento: string;
  revisoes: string;
  preco: number;
  status?: StatusVeiculo; // Optional, as you provide a default value
  troca: string;
  sobre: string;
  usuarioId: string;
  images?: string[]; // Optional, as you check for its existence
}
