/* eslint-disable prettier/prettier */
// src/car/car.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './carro.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images')) // <- Campo form-data: images[]
  async createCar(
    @Body() body: CreateCarDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.carService.createCar(body, files);
  }

  @Get()
  getAllCars() {
    return this.carService.getAll();
  }
}
