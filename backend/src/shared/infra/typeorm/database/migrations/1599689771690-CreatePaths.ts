import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePaths1599689771690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'paths',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'origin_city_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'destination_city_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'modal_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'provider_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'boarding_days',
            type: 'varchar(255)',
          },
          {
            name: 'boarding_times',
            type: 'varchar(255)',
          },
          {
            name: 'duration',
            type: 'smallint',
          },
          {
            name: 'mileage',
            type: 'decimal(6,2)',
          },
          {
            name: 'cost',
            type: 'decimal(6,2)',
          },
          {
            name: 'boarding_place',
            type: 'varchar(255)',
          },
          {
            name: 'departure_place',
            type: 'varchar(255)',
          },
          {
            name: 'is_hired',
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

    await queryRunner.createForeignKey(
      'paths',
      new TableForeignKey({
        name: 'PathOriginCity',
        columnNames: ['origin_city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'paths',
      new TableForeignKey({
        name: 'PathDestinationCity',
        columnNames: ['destination_city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'paths',
      new TableForeignKey({
        name: 'PathModal',
        columnNames: ['modal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'paths',
      new TableForeignKey({
        name: 'PathProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('paths', 'PathProvider');

    await queryRunner.dropForeignKey('paths', 'PathModal');

    await queryRunner.dropForeignKey('paths', 'PathDestinationCity');

    await queryRunner.dropForeignKey('paths', 'PathOriginCity');

    await queryRunner.dropTable('paths');
  }
}
