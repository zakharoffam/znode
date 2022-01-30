import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class ExampleService {
  /**
   * Пример запуска метода каждую минуту
   * @private
   */
  @Cron(CronExpression.EVERY_MINUTE)
  private async example() {
    Logger.log(`Запуск каждую минуту`, `ExampleService.example()`);
  }


  /**
   * Пример запуска метода каждую минуту, но со смещением в 15 секунд
   * @private
   */
  @Cron(CronExpression.EVERY_MINUTE)
  private async exampleWithStartupOffset() {
    setTimeout(() => {
      Logger.log(`Запуск каждую минуту со смещением в 15 секунд`, `ExampleService.example()`);
    }, 15000);
  }
}
