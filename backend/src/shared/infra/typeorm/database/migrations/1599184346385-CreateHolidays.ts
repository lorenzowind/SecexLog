import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateHolidays1599184346385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'holidays',
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
            name: 'city_name',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'initial_date',
            type: 'varchar(6)',
          },
          {
            name: 'end_date',
            type: 'varchar(6)',
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
    await queryRunner.dropTable('holidays');
  }
}
