import { Action, Command, Ctx, Hears, Help, Sender, Start, Update, On, Message} from "nestjs-telegraf";
import { Context } from "telegraf";
import { Scenes } from 'telegraf';
import { Update as ActionUpdate } from 'telegraf/typings/core/types/typegram';
import { ADMIN_SCENE, MAIN_SCENE } from "./scenes/scenes.constants";
import { LogHelperBotEntity } from "@znode/storage";

@Update()
export class ZnodeHelperBotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context, @Sender() sender) {
    await LogHelperBotEntity.addRecord(`К боту подключен новый пользователь - ${sender.username}`);
    await LogHelperBotEntity.addRecord(JSON.stringify(sender));
    await ctx.tg.sendMessage(1040890736, `Новый пользователь - ${sender.first_name || sender.username}`);
    await ctx.reply(`Привет, ${sender.first_name || sender.username}!`);
    await ctx.tg.sendChatAction(ctx.chat.id, 'typing');
    setTimeout(async () => {
      await ctx.reply('Меня зовут ZNodeHelperBot.');
    }, 1000);
    await ctx.tg.sendChatAction(ctx.chat.id, 'typing');
    setTimeout(async () => {
      await ctx.reply('Выбери что нужно сделать.', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Войти в главную сцену', callback_data: 'mainScene'}, { text: 'Администрирование', callback_data: 'adminScene' }],
            [{ text: 'Справка', callback_data: 'help' }, { text: 'Выйти', callback_data: 'exit' }],
          ],
        },
      });
    }, 2000);
  }


  @Action(/mainScene|adminScene|help|exit/)
  async onAction(
    @Ctx() ctx: Scenes.SceneContext & { update: ActionUpdate.CallbackQueryUpdate },
    @Sender('first_name') firstName: string
  ) {
    const action = 'data' in ctx.update.callback_query ? ctx.update.callback_query.data : null;
    if (action === 'mainScene') await ctx.scene.enter(MAIN_SCENE);
    if (action === 'adminScene') await ctx.scene.enter(ADMIN_SCENE);
    if (action === 'help') await this.onHelp(ctx, firstName);
    if (action === 'exit') await ctx.reply('До новых встреч.');
  }


  @Help()
  async onHelp(@Ctx() ctx: Context, @Sender('first_name') firstName: string) {
    setTimeout(async () => {
      await ctx.reply(`Как только научусь это делать... :)`);
    }, 1000);
    await ctx.reply(`Я тебе обязательно помогу, ${firstName}.`);
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context, @Message() message) {
    await LogHelperBotEntity.addRecord(JSON.stringify(message));
    await ctx.reply('Говори-говори. Я так быстрее научусь общаться. 😉');
  }


  @Hears(['Привет', 'Здорова', 'Hi', 'Hello'])
  async onHears(@Ctx() ctx: Context) {
    await ctx.reply(`П`);
  }


  @Command('scene')
  async onCommandScene(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.scene.enter(MAIN_SCENE);
  }
}
