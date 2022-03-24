import { Injectable, Logger } from "@nestjs/common";
import { Start, Update, On, Action, Hears } from "nestjs-telegraf";
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
    Logger.log('Новый чат!', 'TelegramHelperBotService.startCommand()');
    await ctx.tg.sendMessage(1040890736, 'К боту подключился новый пользователь!');
  }

  @On('message')
  public async messageCommand(ctx: Context) {
    await TeleramUpdateEntity.addRecord(JSON.stringify(ctx.update));
    Logger.log('Новое сообщение!', 'TelegramHelperBotService.messageCommand()');
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


  @Hears('ping')
  public async getMe(ctx: Context) {
    await ctx.reply('Пинг просто АГОНЬ!!!');
  }


  @Action(['4', '8'])
  public async onAnswer(ctx: Context) {
    Logger.log('Новое действие!', 'TelegramHelperBotService.onAnswer()');
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
        setTimeout(async () => {
          await ctx.reply('Теперь ты можешь попробовать попинговать меня. ;)');
        }, 5000);
        setTimeout(async () => {
          await ctx.reply('Я запингуюсь если отправить мне команду "ping".');
        }, 5000);
      } else {
        setTimeout(async () => {
          await ctx.reply('К сожалению это не верный ответ.');
          await ctx.reply('🤪');
        }, 1000);
      }
    }
  }
}
