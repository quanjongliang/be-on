import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAvatar1642403014360 implements MigrationInterface {
    name = 'updateAvatar1642403014360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarKey" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarKey"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarUrl"`);
    }

}
