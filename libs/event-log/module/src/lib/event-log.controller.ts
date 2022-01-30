import { Body, Controller, Get, Post } from '@nestjs/common';
import { User, UserInterface } from '@uparm-automation/auth-module';
import { EventLogDto } from '@uparm-automation/event-log-module';

@Controller('event-log')
export class EventLogController {
  constructor() {}

  /**
   * Создать событие журнала
   * @url /api/event-log
   * @param user
   * @param data
   * @private
   */
  @Post()
  private async createEventLog(@User() user: UserInterface, @Body() data: EventLogDto) {
    console.log(user);
    console.log(data);
    return {
      timestamp: new Date(),
      result: 'Событие зафиксировано',
    };
  }


  /**
   * Получить список всех событий журнала
   * @url /api/event-log
   * @private
   */
  @Get()
  private async getAllEvents() {
    return [
      { timestamp: new Date().toUTCString(), event: Math.random() },
      { timestamp: new Date().toUTCString(), event: Math.random() },
      { timestamp: new Date().toUTCString(), event: Math.random() },
    ];
  }
}
