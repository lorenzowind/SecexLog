import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertCitiesDefaultValues1627565340521
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('cities')
      .values([
        {
          id: 'DC-01',
          name: 'Alvarães',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-02',
          name: 'Amaturá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-03',
          name: 'Anamã',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-04',
          name: 'Anori',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-05',
          name: 'Apuí',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-06',
          name: 'Atalaia do Norte',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-07',
          name: 'Autazes',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-08',
          name: 'Barcelos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-09',
          name: 'Barreirinha',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-10',
          name: 'Benjamin Constant',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-11',
          name: 'Beruri',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-12',
          name: 'Boa Vista do Ramos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-13',
          name: 'Boca do Acre',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-14',
          name: 'Borba',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-15',
          name: 'Caapiranga',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-16',
          name: 'Canutama',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-17',
          name: 'Carauari',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-18',
          name: 'Careiro',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-19',
          name: 'Careiro da Várzea',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-20',
          name: 'Coari',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-21',
          name: 'Codajás',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-22',
          name: 'Eirunepé',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-23',
          name: 'Envira',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-24',
          name: 'Fonte Boa',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-25',
          name: 'Guajará',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-26',
          name: 'Humaitá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-27',
          name: 'Ipixuna',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-28',
          name: 'Iranduba',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-29',
          name: 'Itacoatiara',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-30',
          name: 'Itamarati',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-31',
          name: 'Itapiranga',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-32',
          name: 'Japurá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-33',
          name: 'Juruá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-34',
          name: 'Jutaí',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-35',
          name: 'Lábrea',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-36',
          name: 'Manacapuru',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-37',
          name: 'Manaquiri',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-38',
          name: 'Manaus',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-39',
          name: 'Manicoré',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-40',
          name: 'Maraã',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-41',
          name: 'Maués',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-42',
          name: 'Nhamundá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-43',
          name: 'Nova Olinda do Norte',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-44',
          name: 'Novo Airão',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-45',
          name: 'Novo Aripuanã',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-46',
          name: 'Parintins',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-47',
          name: 'Pauini',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-48',
          name: 'Presidente Figueiredo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-49',
          name: 'Rio Preto da Eva',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-50',
          name: 'Santa Isabel do Rio Negro',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-51',
          name: 'Santo Antônio do Içá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-52',
          name: 'São Gabriel da Cachoeira',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-53',
          name: 'São Paulo de Olivença',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-54',
          name: 'São Sebastião do Uatumã',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-55',
          name: 'Silves',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-56',
          name: 'Tabatinga',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-57',
          name: 'Tapauá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-58',
          name: 'Tefé',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-59',
          name: 'Tonantins',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-60',
          name: 'Uarini',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-61',
          name: 'Urucará',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'DC-62',
          name: 'Urucurituba',
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
      .from('cities')
      .where('id = :id', { id: 'DC-01' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-02' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-03' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-04' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-05' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-06' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-07' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-08' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-09' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-10' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-11' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-12' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-13' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-14' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-15' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-16' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-17' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-18' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-19' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-20' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-21' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-22' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-23' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-24' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-25' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-26' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-27' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-28' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-29' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-30' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-31' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-32' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-33' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-34' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-35' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-36' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-37' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-38' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-39' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-40' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-41' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-42' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-43' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-44' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-45' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-46' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-47' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-48' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-49' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-50' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-51' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-52' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-53' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-54' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-55' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-56' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-57' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-58' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-59' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-60' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-61' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('cities')
      .where('id = :id', { id: 'DC-62' })
      .execute();
  }
}
