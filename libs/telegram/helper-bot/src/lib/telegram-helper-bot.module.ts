import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventLoggerRecordEntity } from "@znode/storage";
import { TelegramHelperBotController } from './telegram-helper-bot.controller';
import { TelegramHelperBotService } from "./telegram-helper-bot.service";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      EventLoggerRecordEntity,
    ]),
  ],
  controllers: [TelegramHelperBotController],
  providers: [TelegramHelperBotService],
})
export class TelegramHelperBotModule {}
