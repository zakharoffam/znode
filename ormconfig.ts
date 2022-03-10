import { join } from 'path';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * Конфигурация подключения к СУБД
 * Данная конфигурация используется как для работы в рантайме, так и для работы с TypeORM CLI
 */
export default ((): TypeOrmModuleOptions  => {
  if (process.env.NODE_ENV === 'production') {
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
  } else {
    return {
      type: 'sqljs',
      location: 'dev.db',
      autoSave: true,
      synchronize: false,
      retryAttempts: 1,
      autoLoadEntities: true,
      logging: 'all',
      logger: 'file',
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
  }
})();
