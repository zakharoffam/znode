import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventLoggerRecordEntity } from "@znode/storage";
import { EventLoggerRecordDto } from "./dto/event-logger-record.dto";

@Controller('event-logger')
export class EventLoggerController {
  /**
   * Добавить запись в журнал событий
   * @url /api/event-logger/record
   * @param body EventLoggerRecordDto
   * @returns EventLoggerRecordEntity
   */
  @Post('records')
  private async postRecord(@Body() body: EventLoggerRecordDto): Promise<EventLoggerRecordEntity> {
    return await EventLoggerRecordEntity.addRecord(body.type, body.message, body.context);
  }


  /**
   * Получить все записи журнала событий
   * @returns EventLoggerRecordEntity[]
   */
  @Get('records')
  private async getRecords(): Promise<EventLoggerRecordEntity[]> {
    return await EventLoggerRecordEntity.find();
  }
}