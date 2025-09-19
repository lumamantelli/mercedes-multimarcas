/* eslint-disable prettier/prettier */
import { StatusVeiculo } from '@prisma/client';
import { prisma } from '../prisma/prismaClient';

interface CriarCarroInput {
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

export async function listarCarros() {
    return prisma.carro.findMany();
}

export async function listarCarroPorId(id: string) {
  return prisma.carro.findMany({
      where: { id },
  });
}

export async function criarCarro(data: CriarCarroInput) {
  console.log('Dados recebidos para criar carro:', data); // Log the received data
    const carro = await prisma.carro.create({
        data: {
          marca: data.marca,
          modelo: data.modelo,
          ano: data.ano,
          cidade: data.cidade,
          estado: data.estado,
          quilometragem: data.quilometragem,
          cor: data.cor,
          combustivel: data.combustivel,
          motor: data.motor,
          tracao: data.tracao,
          cambio: data.cambio,
          cabine: data.cabine,
          fplaca: data.fplaca,
          ipva: data.ipva,
          licenciamento: data.licenciamento,
          revisoes: data.revisoes,
          preco: data.preco,
          status: StatusVeiculo.DISPONIVEL, // Default value if not provided
          troca: data.troca,
          sobre: data.sobre,
          usuarioId: data.usuarioId,
          imagemUrl: data.images ? { create: data.images.map(url => ({ url })) } : undefined
        }
      });
    
      return carro;
  }
  
  export async function atualizarCarro(id: string, data: Partial<CriarCarroInput>) {
    return prisma.carro.update({
        where: { id },
        data,
    });
  }
  
export async function deletarCarro(id: string) {
    return prisma.carro.delete({
        where: { id },
    });
}

export async function listarCarrosPorUsuario(usuarioId: string) {
    return prisma.carro.findMany({
        where: { usuarioId },
    });
}

