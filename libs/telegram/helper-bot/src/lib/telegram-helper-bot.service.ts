import { Injectable } from "@nestjs/common";
import { Start, Update, On, Action } from "nestjs-telegraf";
import { Context } from "telegraf";
import { TeleramUpdateEntity } from "@znode/storage";

@Update()
@Injectable()
export class TelegramHelperBotService {

  @Start()
  public async startCommand(ctx: Context) {
    await TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
    await ctx.reply('Привет!');
    await ctx.reply('👋');

    await ctx.tg.sendMessage(1040890736, 'К боту подключился новый пользователь!');
  }

  @On('message')
  public async messageCommand(ctx: Context) {
    await TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
    await ctx.reply('Привет!');
    await ctx.reply('👋');
    setTimeout(async () => {
      await ctx.reply('Сколько будет 2 + 2?', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '4', callback_data: '4'}],
            [{ text: '8', callback_data: '8'}]
          ]
        }
      })
    }, 1000);
  }

  @Action(['4', '8'])
  public async onAnswer(ctx: Context) {
    if ("callback_query" in ctx.update) {
      const query = ctx.update.callback_query;
      const userAnswer = 'data' in query ? query.data : null;

      await ctx.reply('Тут надо подумать...');
      await ctx.reply('🤔');
      await ctx.tg.sendChatAction(1040890736, 'typing');

      if (userAnswer === '4') {
        setTimeout(async () => {
          await ctx.reply('Правильно!');
          await ctx.reply('🥳');
        }, 2500);
      } else {
        setTimeout(async () => {
          await ctx.reply('К сожалению это не верный ответ.');
          await ctx.reply('🤪');
        }, 1000);
      }
    }
  }
}
