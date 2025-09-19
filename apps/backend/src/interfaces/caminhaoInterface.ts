/* eslint-disable prettier/prettier */
import { StatusVeiculo } from "generated/prisma";

export default interface CriarCaminhaoInput {
    marca: string;
    modelo: string;
    ano: number;
    cidade: string;
    estado: string;
    quilometragem: number;
    cor: string;
    combustivel: string;
    carroceria: string;
    ipva: string;
    licenciamento: string;
    cabine: string;
    cambio: string;
    tracao: string;
    preco: number;
    status: StatusVeiculo;
    troca: string;
    sobre: string;
    usuarioId: string;
    imagemUrl?: string[];
}