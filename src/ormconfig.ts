import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const commonConf = {
  SYNCRONIZE: true,
  ENTITIES: [__dirname + '/models/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/src/migration/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: './src/migration',
  },
  MIGRATIONS_RUN: true,
  timezone: '-03:00',
};

function ormConfig(): TypeOrmModuleOptions {
  const ormconfig: TypeOrmModuleOptions = {
    name: 'dev',
    type: 'postgres',
    url: process.env.DB_URL,
    logging: false,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN,
    ssl: { rejectUnauthorized: false },
  };

  return ormconfig;
}

export { ormConfig };
