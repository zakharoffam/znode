import { Injectable, Logger } from "@nestjs/common";
import { Start, Update, On } from "nestjs-telegraf";
import { Context } from "telegraf";
import { TeleramUpdateEntity } from "@znode/storage";

@Update()
@Injectable()
export class TelegramHelperBotService {
  @Start()
  public async startCommand(ctx: Context) {
    Logger.log(`Новый пользователе телеграм-бота ${ctx}`, `TelegramHelperBotService.startCommand()`);
    await TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
    await ctx.reply('Привет!');
  }

  @On('message')
  public async messageCommand(ctx: Context) {
    await TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
    // @ts-ignore
    if (ctx.update && ctx.update.message.text === 'Статистика') {
      const allRecords = await TeleramUpdateEntity.find({ order: { timestamp: 'DESC' }, take: 5 });
      await ctx.reply(JSON.stringify(allRecords));
    } else {
      Logger.log(JSON.stringify(ctx.update), `TelegramHelperBotService.messageCommand()`);
      await ctx.reply('Я пока ничего не умею. :(');
      setTimeout(async () => {
        await ctx.reply('Но я обязательно научусь и сообщу тебе об этом! :)');
      }, 1000);
    }
  }
}
