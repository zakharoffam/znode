import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventLoggerRecordEntity, TeleramUpdateEntity } from "@znode/storage";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramHelperBotService } from "./telegram-helper-bot.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventLoggerRecordEntity,
      TeleramUpdateEntity,
    ]),
    TelegrafModule.forRoot({
      token: String(process.env.HELPER_BOT_TOKEN),
    }),
  ],
  providers: [TelegramHelperBotService],
})
export class TelegramHelperBotModule {}
