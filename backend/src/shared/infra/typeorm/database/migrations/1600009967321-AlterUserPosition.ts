import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterUserPosition1600009967321
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'position');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'position',
        type: "enum('Usuário', 'Administrador')",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'position');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'position',
        type: "enum('user', 'admin')",
      }),
    );
  }
}
