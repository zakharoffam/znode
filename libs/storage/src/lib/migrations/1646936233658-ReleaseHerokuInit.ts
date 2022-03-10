import {MigrationInterface, QueryRunner} from "typeorm";

export class ReleaseHerokuInit1646936233658 implements MigrationInterface {
    name = 'ReleaseHerokuInit1646936233658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_LOGGER_records" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar CHECK( type IN ('log','error','warn','debug','verbose') ) NOT NULL, "message" varchar(1000) NOT NULL, "context" varchar(255))`);
        await queryRunner.query(`INSERT INTO "temporary_LOGGER_records"("id", "timestamp", "type", "message", "context") SELECT "id", "timestamp", "type", "message", "context" FROM "LOGGER_records"`);
        await queryRunner.query(`DROP TABLE "LOGGER_records"`);
        await queryRunner.query(`ALTER TABLE "temporary_LOGGER_records" RENAME TO "LOGGER_records"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LOGGER_records" RENAME TO "temporary_LOGGER_records"`);
        await queryRunner.query(`CREATE TABLE "LOGGER_records" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar CHECK( type IN ('log','error','warn','debug','verbose') ) NOT NULL, "message" varchar(1000) NOT NULL, "context" varchar(255))`);
        await queryRunner.query(`INSERT INTO "LOGGER_records"("id", "timestamp", "type", "message", "context") SELECT "id", "timestamp", "type", "message", "context" FROM "temporary_LOGGER_records"`);
        await queryRunner.query(`DROP TABLE "temporary_LOGGER_records"`);
    }

}
