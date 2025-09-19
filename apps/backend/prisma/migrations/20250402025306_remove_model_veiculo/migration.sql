/*
  Warnings:

  - You are about to drop the column `veiculoId` on the `caminhao` table. All the data in the column will be lost.
  - You are about to drop the column `veiculoId` on the `carro` table. All the data in the column will be lost.
  - You are about to drop the column `veiculoId` on the `imagemveiculo` table. All the data in the column will be lost.
  - You are about to drop the column `veiculoId` on the `maquina` table. All the data in the column will be lost.
  - You are about to drop the column `veiculoId` on the `moto` table. All the data in the column will be lost.
  - You are about to drop the `veiculo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ano` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combustivel` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quilometragem` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobre` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `troca` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ano` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combustivel` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quilometragem` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobre` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `troca` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ImagemVeiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ano` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combustivel` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quilometragem` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobre` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `troca` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ano` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combustivel` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quilometragem` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobre` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `troca` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `caminhao` DROP FOREIGN KEY `Caminhao_veiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `carro` DROP FOREIGN KEY `Carro_veiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `imagemveiculo` DROP FOREIGN KEY `ImagemVeiculo_veiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `maquina` DROP FOREIGN KEY `maquina_veiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `moto` DROP FOREIGN KEY `Moto_veiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `veiculo` DROP FOREIGN KEY `Veiculo_userId_fkey`;

-- DropIndex
DROP INDEX `Caminhao_veiculoId_fkey` ON `caminhao`;

-- DropIndex
DROP INDEX `Carro_veiculoId_fkey` ON `carro`;

-- DropIndex
DROP INDEX `ImagemVeiculo_veiculoId_fkey` ON `imagemveiculo`;

-- DropIndex
DROP INDEX `maquina_veiculoId_fkey` ON `maquina`;

-- DropIndex
DROP INDEX `Moto_veiculoId_fkey` ON `moto`;

-- AlterTable
ALTER TABLE `caminhao` DROP COLUMN `veiculoId`,
    ADD COLUMN `ano` INTEGER NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `combustivel` VARCHAR(191) NOT NULL,
    ADD COLUMN `cor` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `marca` VARCHAR(191) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(191) NOT NULL,
    ADD COLUMN `preco` DOUBLE NOT NULL,
    ADD COLUMN `quilometragem` INTEGER NOT NULL,
    ADD COLUMN `sobre` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    ADD COLUMN `troca` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `carro` DROP COLUMN `veiculoId`,
    ADD COLUMN `ano` INTEGER NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `combustivel` VARCHAR(191) NOT NULL,
    ADD COLUMN `cor` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `marca` VARCHAR(191) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(191) NOT NULL,
    ADD COLUMN `preco` DOUBLE NOT NULL,
    ADD COLUMN `quilometragem` INTEGER NOT NULL,
    ADD COLUMN `sobre` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    ADD COLUMN `troca` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `imagemveiculo` DROP COLUMN `veiculoId`,
    ADD COLUMN `caminhaoId` VARCHAR(191) NULL,
    ADD COLUMN `carroId` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `maquinaId` VARCHAR(191) NULL,
    ADD COLUMN `motoId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `maquina` DROP COLUMN `veiculoId`,
    ADD COLUMN `ano` INTEGER NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `combustivel` VARCHAR(191) NOT NULL,
    ADD COLUMN `cor` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `marca` VARCHAR(191) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(191) NOT NULL,
    ADD COLUMN `preco` DOUBLE NOT NULL,
    ADD COLUMN `quilometragem` INTEGER NOT NULL,
    ADD COLUMN `sobre` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    ADD COLUMN `troca` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `moto` DROP COLUMN `veiculoId`,
    ADD COLUMN `ano` INTEGER NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `combustivel` VARCHAR(191) NOT NULL,
    ADD COLUMN `cor` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `marca` VARCHAR(191) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(191) NOT NULL,
    ADD COLUMN `preco` DOUBLE NOT NULL,
    ADD COLUMN `quilometragem` INTEGER NOT NULL,
    ADD COLUMN `sobre` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    ADD COLUMN `troca` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `veiculo`;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_carroId_fkey` FOREIGN KEY (`carroId`) REFERENCES `Carro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_motoId_fkey` FOREIGN KEY (`motoId`) REFERENCES `Moto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_caminhaoId_fkey` FOREIGN KEY (`caminhaoId`) REFERENCES `Caminhao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_maquinaId_fkey` FOREIGN KEY (`maquinaId`) REFERENCES `maquina`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carro` ADD CONSTRAINT `Carro_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moto` ADD CONSTRAINT `Moto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caminhao` ADD CONSTRAINT `Caminhao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maquina` ADD CONSTRAINT `maquina_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
