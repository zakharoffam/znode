import { Action, Ctx, Scene, SceneEnter, SceneLeave, Sender } from "nestjs-telegraf";
import { Context } from "telegraf";
import { Scenes } from 'telegraf';
import { ADMIN_SCENE } from "./scenes.constants";
import { Update as ActionUpdate } from "telegraf/typings/core/types/typegram";
import { LogHelperBotEntity } from "@znode/storage";

@Scene(ADMIN_SCENE)
export class AdminScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context, @Sender() sender) {
    if (ctx.chat.id !== 1040890736) {
      await ctx.reply(`${sender.first_name || sender.username}, ты не мой администратор, и я вынужден изгнать тебя из этой комнаты!`);
      await this.onSceneLeave(ctx as Scenes.SceneContext);
    }
    await ctx.reply(`${sender.first_name || sender.username} - ты мой администратор. Я рад тебя снова встретить!`);
    await ctx.reply('Расскажи, что будем делать?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Посмотрим логи', callback_data: 'logs' }],
          [{ text: 'Выйти из панели администрирования', callback_data: 'exitFromAdminScene' }],
        ],
      }
    });
  }


  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.reply('До новый встреч, мой любимый администратор! ;(');
    await ctx.scene.leave();
  }


  @Action(/logs|exitFromAdminScene/)
  async onAction(@Ctx() ctx: Scenes.SceneContext & { update: ActionUpdate.CallbackQueryUpdate }) {
    const action = 'data' in ctx.update.callback_query ? ctx.update.callback_query.data : null;
    if (action === 'logs') {
      const logs = await LogHelperBotEntity.find({ take: 30 });
      if (!logs.length) {
        await ctx.reply('В логах пусто.');
      } else {
        for (const log of logs) {
          await ctx.reply('Держи 30 последних записей:');
          await ctx.reply(`[${new Date(log.timestamp).toISOString()}] ${log.message}`);
        }
      }
    }


    if (action === 'exitFromAdminScene') await this.onSceneLeave(ctx);
  }
}
