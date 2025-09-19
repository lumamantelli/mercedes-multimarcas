/* eslint-disable prettier/prettier */
// src/car/car.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Express } from 'express';

@Injectable()
export class CarService {
  constructor(
    private prisma: PrismaService,
    private firebaseService: FirebaseService,
  ) {}

  async createCar(dto: CreateCarDto, files: Express.Multer.File[]) {
    const imageUrls: string[] = [];

    for (const file of files) {
      const url: string = await this.firebaseService.uploadToFirebase(file);

      imageUrls.push(url);
    }

    const carro = await this.prisma.carro.create({
      data: {
        ...dto,
        ano: Number(dto.ano),
        quilometragem: Number(dto.quilometragem),
        preco: Number(dto.preco),
        imagemUrl: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: { imagemUrl: true },
    });

    return carro;
  }

  async getAll() {
    return this.prisma.carro.findMany({ include: { imagemUrl: true } });
  }
}
