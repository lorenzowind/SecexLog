import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertUserAdminDefault1627673531443
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: 'DU-01',
          name: 'admin',
          login: 'admin',
          email: 'admin@email.com',
          password:
            '$2a$08$Vyz9LSeC05LtAajTc69X0uHueyff6Uu6VAyQreEGiTY3wOgpGiNRa',
          position: 'Administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('id = :id', { id: 'DU-01' })
      .execute();
  }
}
