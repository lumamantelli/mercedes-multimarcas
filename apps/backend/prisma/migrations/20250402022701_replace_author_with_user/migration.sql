/*
  Warnings:

  - You are about to drop the column `authorId` on the `veiculo` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `veiculo` DROP FOREIGN KEY `Veiculo_authorId_fkey`;

-- DropIndex
DROP INDEX `Veiculo_authorId_fkey` ON `veiculo`;

-- AlterTable
ALTER TABLE `veiculo` DROP COLUMN `authorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
