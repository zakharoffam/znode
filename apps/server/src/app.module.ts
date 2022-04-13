import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from '@znode/storage';
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
    TelegramZnodeHelperBotModule,
  ],
})
export class AppModule {}
