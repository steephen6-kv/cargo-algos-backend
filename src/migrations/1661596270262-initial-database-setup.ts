import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabaseSetup1661596270262 implements MigrationInterface {
    public name = "initialDatabaseSetup1661596270262";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying, "registration_number" character varying, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "is_driver" boolean DEFAULT false, "is_deleted" boolean DEFAULT false, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "avatar" character varying, "phone_number" character varying NOT NULL, "password" character varying, "license" character varying, "status" character varying NOT NULL DEFAULT 'verification-pending', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "is_driver" boolean DEFAULT false, "is_deleted" boolean DEFAULT false, CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_point" character varying NOT NULL, "destination_point" character varying NOT NULL, "trip_start_date" TIMESTAMP NOT NULL, "available_capacity" integer, "is_deleted" boolean DEFAULT false, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "vehicle_id" uuid, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_vehicle" ("user_id" uuid NOT NULL, "vehicle_id" uuid NOT NULL, CONSTRAINT "PK_d67b41ac7ce9df3b003b5453ab4" PRIMARY KEY ("user_id", "vehicle_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3fdd13c107ab4081a6b70c38ea" ON "user_vehicle" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd8b89c8c46a7a0200d03045be" ON "user_vehicle" ("vehicle_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_fd8b89c8c46a7a0200d03045be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fdd13c107ab4081a6b70c38ea"`);
        await queryRunner.query(`DROP TABLE "user_vehicle"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
