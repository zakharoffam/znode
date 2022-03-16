import { Injectable, Logger } from "@nestjs/common";
import { Start, Update, On } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
@Injectable()
export class TelegramHelperBotService {
  @Start()
  public async startCommand(ctx: Context) {
    Logger.log(`Новый пользователе телеграм-бота ${ctx}`, `TelegramHelperBotService.startCommand()`);
    await ctx.reply('Привет!');
  }

  @On('message')
  public async messageCommand(ctx: Context) {
    Logger.log(ctx, `TelegramHelperBotService.messageCommand()`);
    await ctx.reply('Я пока ничего не умею. :(');
    setTimeout(async () => {
      await ctx.reply('Но я обязательно научусь и сообщу тебе об этом! :)');
    }, 1000);
  }
}
