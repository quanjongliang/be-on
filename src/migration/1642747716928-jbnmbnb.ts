import {MigrationInterface, QueryRunner} from "typeorm";

export class jbnmbnb1642747716928 implements MigrationInterface {
    name = 'jbnmbnb1642747716928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "email" character varying, "isActive" boolean NOT NULL DEFAULT false, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatarUrl" character varying, "avatarKey" character varying, "password" character varying NOT NULL, "refreshToken" character varying, "status" character varying NOT NULL, "message" character varying NOT NULL DEFAULT '', "gangId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_fd20ab1a5838db77567b507012" UNIQUE ("gangId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gang_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "gangId" uuid, "userId" uuid, CONSTRAINT "REL_82513f174ca5f630cc533a8a11" UNIQUE ("userId"), CONSTRAINT "PK_749552726c5b946f7c9d1ffa611" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "content" character varying NOT NULL, "avatarUrl" character varying, "avatarKey" character varying, "userId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gang" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "avatarUrl" character varying, "avatarKey" character varying, CONSTRAINT "UQ_c5c09d967359a7a5de838ffaf64" UNIQUE ("name"), CONSTRAINT "PK_1bb95b1060d699216e8472429f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gang_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "startAt" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "actualDifference" character varying, "actualTimeSpent" character varying, "gangId" uuid, CONSTRAINT "PK_ac0fc3be80878d02df7cb9c087f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fd20ab1a5838db77567b5070129" FOREIGN KEY ("gangId") REFERENCES "gang"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gang_member" ADD CONSTRAINT "FK_d36e10cab019c0dab4b4f4d2662" FOREIGN KEY ("gangId") REFERENCES "gang"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gang_member" ADD CONSTRAINT "FK_82513f174ca5f630cc533a8a114" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gang_activity" ADD CONSTRAINT "FK_14fb3026f564af17c5feb37e5c4" FOREIGN KEY ("gangId") REFERENCES "gang"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gang_activity" DROP CONSTRAINT "FK_14fb3026f564af17c5feb37e5c4"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "gang_member" DROP CONSTRAINT "FK_82513f174ca5f630cc533a8a114"`);
        await queryRunner.query(`ALTER TABLE "gang_member" DROP CONSTRAINT "FK_d36e10cab019c0dab4b4f4d2662"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fd20ab1a5838db77567b5070129"`);
        await queryRunner.query(`DROP TABLE "gang_activity"`);
        await queryRunner.query(`DROP TABLE "gang"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "gang_member"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
