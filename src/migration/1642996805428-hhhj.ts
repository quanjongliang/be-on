import {MigrationInterface, QueryRunner} from "typeorm";

export class hhhj1642996805428 implements MigrationInterface {
    name = 'hhhj1642996805428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gang_member" DROP CONSTRAINT "FK_82513f174ca5f630cc533a8a114"`);
        await queryRunner.query(`ALTER TABLE "gang" DROP CONSTRAINT "FK_d6926ec3ab3e8d6ef14b3eb8077"`);
        await queryRunner.query(`ALTER TABLE "gang_member" DROP CONSTRAINT "REL_82513f174ca5f630cc533a8a11"`);
        await queryRunner.query(`ALTER TABLE "gang_member" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "gang" DROP CONSTRAINT "REL_d6926ec3ab3e8d6ef14b3eb807"`);
        await queryRunner.query(`ALTER TABLE "gang" DROP COLUMN "ownerId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gang" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "gang" ADD CONSTRAINT "REL_d6926ec3ab3e8d6ef14b3eb807" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "gang_member" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "gang_member" ADD CONSTRAINT "REL_82513f174ca5f630cc533a8a11" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "gang" ADD CONSTRAINT "FK_d6926ec3ab3e8d6ef14b3eb8077" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gang_member" ADD CONSTRAINT "FK_82513f174ca5f630cc533a8a114" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
