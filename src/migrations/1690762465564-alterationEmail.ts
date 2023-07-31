import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterationEmail1690762465564 implements MigrationInterface {
    name = 'AlterationEmail1690762465564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_b48860677afe62cd96e12659482"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email")`);
    }

}
