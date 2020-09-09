import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProviders1599613435625
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'providers',
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
            name: 'phone_number',
            type: 'varchar(16)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'modal_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'preference',
            type: "enum('CPF', 'CNPJ')",
          },
          {
            name: 'preference_data',
            type: 'varchar(16)',
            isUnique: true,
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
      'providers',
      new TableForeignKey({
        name: 'ProviderModal',
        columnNames: ['modal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('providers', 'ProviderModal');

    await queryRunner.dropTable('providers');
  }
}
