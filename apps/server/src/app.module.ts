import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from '@znode/storage';
import { AuthModule } from '@znode/auth-server-module';
import { UsersModule } from "@znode/users/server-module";
import { EventLoggerModule } from '@znode/event-logger';
import { TelegramHelperBotModule } from "@znode/telegram/helper-bot";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    StorageModule,
    EventLoggerModule,
    // AuthModule,
    UsersModule,
    TelegramHelperBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
