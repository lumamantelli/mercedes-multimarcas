-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL DEFAULT '66999999999',
    `endereco` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NOT NULL DEFAULT 'Sorriso',
    `estado` VARCHAR(191) NOT NULL DEFAULT 'MT',
    `fotoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImagemVeiculo` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `carroId` VARCHAR(191) NULL,
    `motoId` VARCHAR(191) NULL,
    `caminhaoId` VARCHAR(191) NULL,
    `maquinaId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carro` (
    `id` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `quilometragem` INTEGER NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `combustivel` VARCHAR(191) NOT NULL,
    `motor` VARCHAR(191) NOT NULL,
    `tracao` VARCHAR(191) NOT NULL,
    `cambio` VARCHAR(191) NOT NULL,
    `cabine` VARCHAR(191) NOT NULL,
    `fplaca` VARCHAR(191) NOT NULL,
    `ipva` VARCHAR(191) NOT NULL,
    `licenciamento` VARCHAR(191) NOT NULL,
    `revisoes` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    `troca` VARCHAR(191) NOT NULL,
    `sobre` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moto` (
    `id` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `quilometragem` INTEGER NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `combustivel` VARCHAR(191) NOT NULL,
    `partida` VARCHAR(191) NOT NULL,
    `marchas` VARCHAR(191) NOT NULL,
    `refrigeracao` VARCHAR(191) NOT NULL,
    `freio` VARCHAR(191) NOT NULL,
    `estilo` VARCHAR(191) NOT NULL,
    `alimentacao` VARCHAR(191) NOT NULL,
    `motor` VARCHAR(191) NOT NULL,
    `cilindrada` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    `troca` VARCHAR(191) NOT NULL,
    `sobre` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Caminhao` (
    `id` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `quilometragem` INTEGER NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `combustivel` VARCHAR(191) NOT NULL,
    `carroceria` VARCHAR(191) NOT NULL,
    `ipva` VARCHAR(191) NOT NULL,
    `licenciamento` VARCHAR(191) NOT NULL,
    `cabine` VARCHAR(191) NOT NULL,
    `cambio` VARCHAR(191) NOT NULL,
    `tracao` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    `troca` VARCHAR(191) NOT NULL,
    `sobre` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maquina` (
    `id` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `quilometragem` INTEGER NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `combustivel` VARCHAR(191) NOT NULL,
    `tracao` VARCHAR(191) NOT NULL,
    `cabine` VARCHAR(191) NOT NULL,
    `motor` VARCHAR(191) NOT NULL,
    `direcao` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `status` ENUM('VENDIDO', 'DISPONIVEL') NOT NULL DEFAULT 'DISPONIVEL',
    `troca` VARCHAR(191) NOT NULL,
    `sobre` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_carroId_fkey` FOREIGN KEY (`carroId`) REFERENCES `Carro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_motoId_fkey` FOREIGN KEY (`motoId`) REFERENCES `Moto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_caminhaoId_fkey` FOREIGN KEY (`caminhaoId`) REFERENCES `Caminhao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagemVeiculo` ADD CONSTRAINT `ImagemVeiculo_maquinaId_fkey` FOREIGN KEY (`maquinaId`) REFERENCES `Maquina`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carro` ADD CONSTRAINT `Carro_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moto` ADD CONSTRAINT `Moto_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caminhao` ADD CONSTRAINT `Caminhao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maquina` ADD CONSTRAINT `Maquina_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
