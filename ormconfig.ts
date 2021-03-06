import { join } from 'path';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * Конфигурация подключения к СУБД
 */
export default ((): TypeOrmModuleOptions  => {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    autoLoadEntities: true,
    synchronize: false,
    retryAttempts: 1,
    cli: {
      migrationsDir: join(__dirname, 'libs', 'storage', 'src', 'lib', 'migrations'),
    },
    entities: [
      join(__dirname, 'libs', 'storage', 'src', 'lib', 'entities', '*.entity.{ts,js}'),
      join(__dirname, 'libs', 'storage', 'src', 'lib', 'entities', '**', '*.entity.{ts,js}'),
    ],
    migrations: [
      join(__dirname, 'libs', 'storage', 'src', 'lib', 'migrations','*.{ts,js}'),
      join(__dirname, 'libs', 'storage', 'src', 'lib', 'migrations', '**', '*.{ts,js}'),
    ],
    subscribers: [
      join(__dirname, 'libs', 'storage', 'src', 'lib', 'subscribers','*.{ts,js}'),
      join(__dirname, 'libs', 'storage', 'src', 'lib', 'subscribers', '**', '*.{ts,js}'),
    ],
  }
})();
