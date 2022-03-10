import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from '@znode/storage';
import { AuthModule } from '@znode/auth-server-module';
import { EventLoggerModule } from '@znode/event-logger-server-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    StorageModule,
    AuthModule,
    EventLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
