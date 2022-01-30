import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabasesModule } from '@uparm-automation/database';
import { AuthModule } from '@uparm-automation/auth-module';
import { EventLogModule } from '@uparm-automation/event-log-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web-client'),
    }),
    DatabasesModule,
    AuthModule,
    EventLogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
