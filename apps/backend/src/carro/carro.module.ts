/* eslint-disable prettier/prettier */
// src/car/car.module.ts
import { Module } from '@nestjs/common';
import { CarController } from './carro.controller';
import { CarService } from './carro.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [FirebaseModule, PrismaModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
