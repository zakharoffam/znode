import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';


const options = (isProd: boolean): TypeOrmModuleOptions => {
  if (isProd) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: 3,
    };
  } else {
    return {
      type: 'sqljs',
      location: join('..', '..', '..', 'dev.db'),
      autoSave: true,
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 3,
      logging: 'all',
      logger: 'file',
    };
  }
}


@Module({
  imports: [
    TypeOrmModule.forRoot(options(process.env.NODE_ENV === 'production')),
  ],
})
export class StorageModule {}
