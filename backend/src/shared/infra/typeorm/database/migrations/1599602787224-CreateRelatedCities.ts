import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class CreateRelatedCities1599602787224
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('cities', 'related_cities');

    await queryRunner.createTable(
      new Table({
        name: 'related_cities',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'city_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'related_city_id',
            type: 'varchar(36)',
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

    await queryRunner.createForeignKey(
      'related_cities',
      new TableForeignKey({
        name: 'CityId',
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'related_cities',
      new TableForeignKey({
        name: 'RelatedCityId',
        columnNames: ['related_city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('related_cities', 'RelatedCityId');
    await queryRunner.dropForeignKey('related_cities', 'CityId');

    await queryRunner.dropTable('related_cities');

    await queryRunner.addColumn(
      'cities',
      new TableColumn({
        name: 'related_cities',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
  }
}
