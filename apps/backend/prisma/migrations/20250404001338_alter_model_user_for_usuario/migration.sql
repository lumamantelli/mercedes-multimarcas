/*
  Warnings:

  - You are about to drop the column `userId` on the `caminhao` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `carro` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `maquina` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `moto` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `caminhao` DROP FOREIGN KEY `Caminhao_userId_fkey`;

-- DropForeignKey
ALTER TABLE `carro` DROP FOREIGN KEY `Carro_userId_fkey`;

-- DropForeignKey
ALTER TABLE `maquina` DROP FOREIGN KEY `maquina_userId_fkey`;

-- DropForeignKey
ALTER TABLE `moto` DROP FOREIGN KEY `Moto_userId_fkey`;

-- DropIndex
DROP INDEX `Caminhao_userId_fkey` ON `caminhao`;

-- DropIndex
DROP INDEX `Carro_userId_fkey` ON `carro`;

-- DropIndex
DROP INDEX `maquina_userId_fkey` ON `maquina`;

-- DropIndex
DROP INDEX `Moto_userId_fkey` ON `moto`;

-- AlterTable
ALTER TABLE `caminhao` DROP COLUMN `userId`,
    ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `carro` DROP COLUMN `userId`,
    ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `maquina` DROP COLUMN `userId`,
    ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `moto` DROP COLUMN `userId`,
    ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carro` ADD CONSTRAINT `Carro_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moto` ADD CONSTRAINT `Moto_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caminhao` ADD CONSTRAINT `Caminhao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maquina` ADD CONSTRAINT `maquina_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
