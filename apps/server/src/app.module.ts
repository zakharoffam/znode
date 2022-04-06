import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from '@znode/storage';
import { AuthModule } from '@znode/auth-server-module';
import { UsersModule } from "@znode/users/server-module";
import { ScheduleModule } from "@nestjs/schedule";
import { TelegramZnodeHelperBotModule } from "@znode/telegram/znode-helper-bot";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ScheduleModule.forRoot(),
    StorageModule,
    AuthModule,
    UsersModule,
    TelegramZnodeHelperBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
