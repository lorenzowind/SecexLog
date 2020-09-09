import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateModals1599610592101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'modals',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isUnique: true,
          },
          {
            name: 'image',
            type: 'varchar(255)',
          },
          {
            name: 'is_safe',
            type: 'boolean',
          },
          {
            name: 'is_cheap',
            type: 'boolean',
          },
          {
            name: 'is_fast',
            type: 'boolean',
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('modals');
  }
}
