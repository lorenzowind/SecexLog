import { ConnectionOptions } from 'typeorm';

export default [
  {
    name: 'default',
    type: 'mysql',
    port: process.env.MYSQL_MASK_PORT,
    host: process.env.SERVICES_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
      process.env.APP_MODE === 'DEVELOPMENT'
        ? './src/modules/**/infra/typeorm/entities/*.ts'
        : './dist/modules/**/infra/typeorm/entities/*.js',
    ],
    migrations: [
      process.env.APP_MODE === 'DEVELOPMENT'
        ? './src/shared/infra/typeorm/database/migrations/*.ts'
        : './dist/shared/infra/typeorm/database/migrations/*.js',
    ],
    cli: {
      migrationsDir:
        process.env.APP_MODE === 'DEVELOPMENT'
          ? './src/shared/infra/typeorm/database/migrations'
          : './dist/shared/infra/typeorm/database/migrations',
    },
  },
] as ConnectionOptions[];
