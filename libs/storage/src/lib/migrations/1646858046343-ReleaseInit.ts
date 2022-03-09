import {MigrationInterface, QueryRunner} from "typeorm";

export class ReleaseInit1646858046343 implements MigrationInterface {
    name = 'ReleaseInit1646858046343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "COMMON_Users" ("email" varchar(255) PRIMARY KEY NOT NULL, "name" varchar(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createTimestamp" datetime NOT NULL DEFAULT (datetime('now')), "updateTimestamp" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_9753c09c98560e56ed563b1ca2a" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "COMMON_User_password" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "passwordHashed" varchar(512) NOT NULL, "userEmail" varchar(255), CONSTRAINT "REL_0f48c17d924dad7d54a22e88b3" UNIQUE ("userEmail"))`);
        await queryRunner.query(`CREATE TABLE "LOGGER_records" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "timestamp" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar CHECK( type IN ('log','error','warn','debug','verbose') ) NOT NULL, "message" varchar(1000) NOT NULL, "context" varchar(255))`);
        await queryRunner.query(`CREATE TABLE "temporary_COMMON_User_password" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "passwordHashed" varchar(512) NOT NULL, "userEmail" varchar(255), CONSTRAINT "REL_0f48c17d924dad7d54a22e88b3" UNIQUE ("userEmail"), CONSTRAINT "FK_0f48c17d924dad7d54a22e88b36" FOREIGN KEY ("userEmail") REFERENCES "COMMON_Users" ("email") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_COMMON_User_password"("id", "passwordHashed", "userEmail") SELECT "id", "passwordHashed", "userEmail" FROM "COMMON_User_password"`);
        await queryRunner.query(`DROP TABLE "COMMON_User_password"`);
        await queryRunner.query(`ALTER TABLE "temporary_COMMON_User_password" RENAME TO "COMMON_User_password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "COMMON_User_password" RENAME TO "temporary_COMMON_User_password"`);
        await queryRunner.query(`CREATE TABLE "COMMON_User_password" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "passwordHashed" varchar(512) NOT NULL, "userEmail" varchar(255), CONSTRAINT "REL_0f48c17d924dad7d54a22e88b3" UNIQUE ("userEmail"))`);
        await queryRunner.query(`INSERT INTO "COMMON_User_password"("id", "passwordHashed", "userEmail") SELECT "id", "passwordHashed", "userEmail" FROM "temporary_COMMON_User_password"`);
        await queryRunner.query(`DROP TABLE "temporary_COMMON_User_password"`);
        await queryRunner.query(`DROP TABLE "LOGGER_records"`);
        await queryRunner.query(`DROP TABLE "COMMON_User_password"`);
        await queryRunner.query(`DROP TABLE "COMMON_Users"`);
    }

}
