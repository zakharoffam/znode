import { Command, Ctx, Hears, Scene, SceneEnter, SceneLeave } from "nestjs-telegraf";
import { Context } from "telegraf";
import { MAIN_SCENE } from "./scenes.constants";
import { Scenes } from 'telegraf';

@Scene(MAIN_SCENE)
export class MainScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.reply('ljljkjlk');
    return 'Поздравляю, ты в главной сцене!';
  }


  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    await ctx.reply('Инициирован выход из главной сцены...');
    setTimeout(async () => {
      await ctx.reply('До встречи!');
    }, 2000);
  }

  @Hears('кто я?')
  async onHearsWhoI(@Ctx() ctx: Context) {
    await ctx.reply('Ты мой царь-государь!');
  }


  @Command('exit')
  async onCommandExit(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.leave();
  }
}
