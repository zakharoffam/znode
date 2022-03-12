import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class TelegramHelperBotService {
  constructor(private httpService: HttpService) {
    httpService.post(`https://api.telegram.org/bot${process.env.HELPER_BOT_TOKEN}/METHOD_NAME`, {
      URL: `https://${process.env.HOST}/telegram-helper-bot/process.env.HELPER_BOT_TOKEN`,
    });
    Logger.log('Вроде бот зарегался!');
  }
}
