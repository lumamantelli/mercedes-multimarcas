/*
  Warnings:

  - Added the required column `estado` to the `Caminhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `maquina` DROP FOREIGN KEY `maquina_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `caminhao` ADD COLUMN `estado` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `carro` ADD COLUMN `estado` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `maquina` ADD COLUMN `estado` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `moto` ADD COLUMN `estado` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `cidade` VARCHAR(191) NOT NULL DEFAULT 'Sorriso',
    ADD COLUMN `endereco` VARCHAR(191) NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'MT',
    ADD COLUMN `fotoUrl` VARCHAR(191) NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL DEFAULT '66999999999';

-- AddForeignKey
ALTER TABLE `Maquina` ADD CONSTRAINT `Maquina_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
