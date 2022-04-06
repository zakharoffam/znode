import { Module } from '@nestjs/common';
import { TelegrafModule } from "nestjs-telegraf";
import { ZnodeHelperBotUpdate } from "./znode-helper-bot.update";
import { MainScene } from "./scenes/main.scene";
import { sessionMiddleware } from "./session.middleware";
import { AdminScene } from "./scenes/admin.scene";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: '@ZNodeHelperBot',
      useFactory: () => ({
        token: String(process.env.HELPER_BOT_TOKEN),
        middlewares: [sessionMiddleware],
      }),
    }),
  ],
  providers: [
    ZnodeHelperBotUpdate,
    MainScene,
    AdminScene,
  ],
})
export class TelegramZnodeHelperBotModule {}
