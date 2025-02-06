-- CreateTable
CREATE TABLE `student` (
    `id` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(20) NOT NULL,
    `name` VARCHAR(45) NOT NULL DEFAULT '',
    `email` VARCHAR(45) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `ra_UNIQUE`(`ra`),
    UNIQUE INDEX `student_email_key`(`email`),
    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
