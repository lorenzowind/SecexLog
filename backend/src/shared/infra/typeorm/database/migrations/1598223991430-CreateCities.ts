import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCities1598223991430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
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
            name: 'is_base',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'is_auditated',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'related_cities',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'latitude',
            type: 'decimal(8,6)',
            isNullable: true,
          },
          {
            name: 'longitude',
            type: 'decimal(8,6)',
            isNullable: true,
          },
          {
            name: 'initial_flood_date',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'end_flood_date',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'interdiction_observation',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'city_observation',
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('cities');
  }
}
