import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOpinions1599505137850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'opinions',
            columns: [
              {
                name: 'id',
                type: 'varchar(36)',
                isPrimary: true,
                isUnique: true,
              },
              {
                name: 'title',
                type: 'varchar(255)',
                isUnique: true,
              },
              {
                name: 'description',
                type: 'varchar(255)',
                isNullable: true,
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'current_timestamp',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'current_timestamp',
              },
            ],
          }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('opinions');
    }

}
