/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function searchService() {
        return {
            async getAll() {
                const [carros, motos, maquinas, caminhoes] = await Promise.all([
                    prisma.carro.findMany({
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }),
                    prisma.moto.findMany({
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }),
                    prisma.maquina.findMany({
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }),
                    prisma.caminhao.findMany({
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }),
                ]);

                return {
                    carros,
                    motos,
                    maquinas,
                    caminhoes,
                    total: carros.length + motos.length + maquinas.length + caminhoes.length,
                };
            },
        };
    }
    