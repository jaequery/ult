import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1708321993374 implements MigrationInterface {
    name = 'CreateUsers1708321993374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" citext NOT NULL, "password" text, "firstName" text, "lastName" text, "street1" text, "street2" text, "city" text, "state" text, "postalCode" text, "countryCode" text, "verified" TIMESTAMP, "authenticated" TIMESTAMP, "deleted" TIMESTAMP, "updated" TIMESTAMP NOT NULL DEFAULT now(), "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
