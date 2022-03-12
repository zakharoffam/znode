import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class TelegramHelperBotService {
  constructor(private httpService: HttpService) {
    const botUrl = `https://${process.env.HOST_URL}/telegram-helper-bot/${process.env.HELPER_BOT_TOKEN}`;
    httpService
      .post(`https://api.telegram.org/bot${process.env.HELPER_BOT_TOKEN}/setWebhook`, { URL: botUrl })
      .toPromise()
      .then(res => {
        console.log(res?.data);
        console.log('Бот успешно зарегистрирован по адресу: ' + botUrl);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        console.log('BOT!!!');
      });
  }
}
