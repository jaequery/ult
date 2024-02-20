import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenderToUsers1708409320347 implements MigrationInterface {
    name = 'AddGenderToUsers1708409320347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    }

}
