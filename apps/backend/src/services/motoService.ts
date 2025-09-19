/* eslint-disable prettier/prettier */
import { prisma } from '../prisma/prismaClient';
import CriarMotoInput from '../interfaces/motoInterface';
import { StatusVeiculo } from '@prisma/client';



export async function listarMotos() {

        const motos = await prisma.moto.findMany();
        return motos;
  
}

export async function criarMoto( data: CriarMotoInput) {
    const moto = await prisma.moto.create({
        data: {
          marca: data.marca,
          modelo: data.modelo,
          ano: data.ano,
          cidade: data.cidade,
          estado: data.estado,
          quilometragem: data.quilometragem,
          cor: data.cor,
          combustivel: data.combustivel,
          partida: data.partida,
          marchas: data.marchas,
          refrigeracao: data.refrigeracao,
          freio: data.freio,
          estilo: data.estilo,
          alimentacao: data.alimentacao,
          motor: data.motor,
          cilindrada: data.cilindrada,
          preco: data.preco,
          status: StatusVeiculo.DISPONIVEL, // Default value
          troca: data.troca,
          sobre: data.sobre,
          usuarioId: data.usuarioId,
          imagemUrl: data.images ? { create: data.images.map(url => ({ url })) } : undefined
        },
    });
    return moto;
}

export async function deletarMoto(id: string) {
    const motoDeletada = await prisma.moto.delete({
        where: {
            id: id,
        },
    });
    return motoDeletada;
}

export async function atualizarMoto(id: string, data: Partial<CriarMotoInput>) {
    const motoAtualizada = await prisma.moto.update({
        where: {
            id: id,
        },
        data: data,
    });
    return motoAtualizada;
}

export async function listarMotosPorUsuario(usuarioId: string) {
    const motos = await prisma.moto.findMany({
        where: {
            usuarioId: usuarioId,
        },
    });
    return motos;
}