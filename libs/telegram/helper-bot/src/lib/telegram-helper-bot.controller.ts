import { Post, Body, Controller, Logger } from "@nestjs/common";
import { TelegramHelperBotService } from './telegram-helper-bot.service';

@Controller('telegram-helper-bot')
export class TelegramHelperBotController {
  constructor(private telegramHelperBotService: TelegramHelperBotService) {}

  @Post(process.env.HELPER_BOT_TOKEN)
  private async update(@Body() data: any): Promise<string> {
    Logger.log('TELEGRAM_HELPER_BOT');
    Logger.log('input_data: ');
    Logger.log(data);
    return 'Ok';
  }
}