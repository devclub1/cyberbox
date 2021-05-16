import {MigrationInterface, QueryRunner} from 'typeorm';

export class firstMigration1618764522766 implements MigrationInterface {
    name = 'firstMigration1618764522766';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `logs` (`uuid` varchar(36) NOT NULL, `action` varchar(10) NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_uuid` varchar(36) NULL, `file_uuid` varchar(36) NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `permissions` (`uuid` varchar(36) NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `activeUntil` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `owner_uuid` varchar(36) NULL, `guest_uuid` varchar(36) NULL, `file_uuid` varchar(36) NULL, UNIQUE INDEX `REL_02a711ff98e055030098b77c0d` (`guest_uuid`), PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `settings` (`uuid` varchar(36) NOT NULL, `theme` varchar(10) NOT NULL, `limit` int NOT NULL, `user_uuid` varchar(36) NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `tokens` (`uuid` varchar(36) NOT NULL, `token` varchar(256) NOT NULL, `active` tinyint NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `activeUntil` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_uuid` varchar(36) NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `users` (`uuid` varchar(36) NOT NULL, `email` varchar(50) NOT NULL, `firstName` varchar(50) NOT NULL, `lastName` varchar(25) NOT NULL, `vault` text NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `memberships` (`uuid` varchar(36) NOT NULL, `owner` tinyint NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `availableUntil` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_uuid` varchar(36) NULL, `group_uuid` varchar(36) NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `groups` (`uuid` varchar(36) NOT NULL, `name` varchar(50) NOT NULL, `description` varchar(100) NOT NULL, `vault` longtext NOT NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `files` (`uuid` varchar(36) NOT NULL, `name` varchar(50) NOT NULL, `description` varchar(200) NOT NULL, `extension` varchar(10) NOT NULL, `path` varchar(150) NOT NULL, `encrypted` tinyint NOT NULL, `directory` tinyint NOT NULL, `label` varchar(10) NOT NULL, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `parent_uuid` varchar(36) NULL, `user_uuid` varchar(36) NULL, `group_uuid` varchar(36) NULL, UNIQUE INDEX `REL_09ff78effb9aaee56c8449a45b` (`parent_uuid`), PRIMARY KEY (`uuid`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `logs` ADD CONSTRAINT `FK_7432f03daadd86aa4ea78d139e8` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `logs` ADD CONSTRAINT `FK_a80194f0c8bfb48ed3ff64bc73c` FOREIGN KEY (`file_uuid`) REFERENCES `files`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `permissions` ADD CONSTRAINT `FK_a4859c04a84c3e344af0706492c` FOREIGN KEY (`owner_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `permissions` ADD CONSTRAINT `FK_02a711ff98e055030098b77c0d6` FOREIGN KEY (`guest_uuid`) REFERENCES `users`(`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `permissions` ADD CONSTRAINT `FK_54cb10970918ccbdcefbe36f88b` FOREIGN KEY (`file_uuid`) REFERENCES `files`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `settings` ADD CONSTRAINT `FK_214aab0c0380e81fb51093595cb` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `tokens` ADD CONSTRAINT `FK_184446c15200c14b3ea0d9f3d1e` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `memberships` ADD CONSTRAINT `FK_8695bd29e41c999ba7c3ae3c5fc` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `memberships` ADD CONSTRAINT `FK_77e0e323d631ce8e578ea746a16` FOREIGN KEY (`group_uuid`) REFERENCES `groups`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `files` ADD CONSTRAINT `FK_09ff78effb9aaee56c8449a45b2` FOREIGN KEY (`parent_uuid`) REFERENCES `files`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `files` ADD CONSTRAINT `FK_069ee640c974c3fbaf7f9e46352` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `files` ADD CONSTRAINT `FK_92935fca0d6d414924556b1bab4` FOREIGN KEY (`group_uuid`) REFERENCES `groups`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `files` DROP FOREIGN KEY `FK_92935fca0d6d414924556b1bab4`');
        await queryRunner.query('ALTER TABLE `files` DROP FOREIGN KEY `FK_069ee640c974c3fbaf7f9e46352`');
        await queryRunner.query('ALTER TABLE `files` DROP FOREIGN KEY `FK_09ff78effb9aaee56c8449a45b2`');
        await queryRunner.query('ALTER TABLE `memberships` DROP FOREIGN KEY `FK_77e0e323d631ce8e578ea746a16`');
        await queryRunner.query('ALTER TABLE `memberships` DROP FOREIGN KEY `FK_8695bd29e41c999ba7c3ae3c5fc`');
        await queryRunner.query('ALTER TABLE `tokens` DROP FOREIGN KEY `FK_184446c15200c14b3ea0d9f3d1e`');
        await queryRunner.query('ALTER TABLE `settings` DROP FOREIGN KEY `FK_214aab0c0380e81fb51093595cb`');
        await queryRunner.query('ALTER TABLE `permissions` DROP FOREIGN KEY `FK_54cb10970918ccbdcefbe36f88b`');
        await queryRunner.query('ALTER TABLE `permissions` DROP FOREIGN KEY `FK_02a711ff98e055030098b77c0d6`');
        await queryRunner.query('ALTER TABLE `permissions` DROP FOREIGN KEY `FK_a4859c04a84c3e344af0706492c`');
        await queryRunner.query('ALTER TABLE `logs` DROP FOREIGN KEY `FK_a80194f0c8bfb48ed3ff64bc73c`');
        await queryRunner.query('ALTER TABLE `logs` DROP FOREIGN KEY `FK_7432f03daadd86aa4ea78d139e8`');
        await queryRunner.query('DROP INDEX `REL_09ff78effb9aaee56c8449a45b` ON `files`');
        await queryRunner.query('DROP TABLE `files`');
        await queryRunner.query('DROP TABLE `groups`');
        await queryRunner.query('DROP TABLE `memberships`');
        await queryRunner.query('DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`');
        await queryRunner.query('DROP TABLE `users`');
        await queryRunner.query('DROP TABLE `tokens`');
        await queryRunner.query('DROP TABLE `settings`');
        await queryRunner.query('DROP INDEX `REL_02a711ff98e055030098b77c0d` ON `permissions`');
        await queryRunner.query('DROP TABLE `permissions`');
        await queryRunner.query('DROP TABLE `logs`');
    }

}